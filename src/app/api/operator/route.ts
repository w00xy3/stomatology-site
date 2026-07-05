import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────
   In-memory store for operator chat sessions.
   Survives hot-reload via globalThis guard.
   ───────────────────────────────────────────────────── */
const g = globalThis as unknown as {
  __tgOffset: number;
  __tgReplies: Map<string, { id: string; text: string; timestamp: number }[]>;
};

g.__tgOffset ??= 0;
g.__tgReplies ??= new Map();

/* ── rate limiter (shared with /api/chat-request concept) ── */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10; // slightly higher for operator chat
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const g2 = globalThis as unknown as { __opRlCleanup?: ReturnType<typeof setInterval> };
if (!g2.__opRlCleanup) {
  g2.__opRlCleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitStore) {
      if (now > val.resetAt) rateLimitStore.delete(key);
    }
  }, 5 * 60_000);
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  return { ok: true };
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ────────────────────────────────────────
   POST — send user question to Telegram
   ──────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const { ok, retryAfter } = checkRateLimit(getClientIp(request));
    if (!ok) {
      return NextResponse.json(
        { error: `Слишком много запросов. Попробуйте через ${retryAfter} сек.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    const body = await request.json();
    const { sessionId, text } = body as { sessionId?: string; text?: string };

    if (!sessionId?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "sessionId и text обязательны" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Сервис уведомлений не настроен" },
        { status: 500 },
      );
    }

    const now = new Date();
    const dateStr = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    /* embed session ID as hidden HTML span so operator can reply */
    const hiddenTag = `<span style="color:transparent;font-size:0">#${sessionId.trim()}</span>`;

    const msg = [
      `💬 <b>Вопрос оператору</b>`,
      ``,
      escapeHtml(text.trim()),
      ``,
      `🕐 ${dateStr}`,
      ``,
      `<i>Для ответа — сделайте Reply на это сообщение.</i>`,
      hiddenTag,
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "Не удалось отправить сообщение" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Operator POST error:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

/* ────────────────────────────────────────
   GET — poll for operator replies
   ──────────────────────────────────────── */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Параметр sessionId обязателен" },
      { status: 400 },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ replies: [] });
  }

  try {
    /* fetch new updates from Telegram */
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${g.__tgOffset}&timeout=0`,
    );
    const data = await res.json();

    if (data.ok && Array.isArray(data.result)) {
      for (const update of data.result) {
        g.__tgOffset = update.update_id + 1;

        const msg = update.message;
        if (!msg?.reply_to_message?.text) continue;

        /* extract session ID from the hidden tag in the original message */
        const match = msg.reply_to_message.text.match(/#(sess-[\w-]+)/);
        if (!match) continue;

        const targetSession = match[1];
        if (!g.__tgReplies.has(targetSession)) {
          g.__tgReplies.set(targetSession, []);
        }

        g.__tgReplies.get(targetSession)!.push({
          id: `op-${update.update_id}`,
          text: msg.text || "",
          timestamp: (msg.date || 0) * 1000,
        });
      }
    }
  } catch (err) {
    console.error("Telegram getUpdates error:", err);
    /* don't fail — just return whatever we have */
  }

  const replies = g.__tgReplies.get(sessionId) || [];

  /* clear returned replies so they aren't sent again */
  if (replies.length > 0) {
    g.__tgReplies.set(sessionId, []);
  }

  return NextResponse.json({ replies });
}

/* ── helpers ── */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
