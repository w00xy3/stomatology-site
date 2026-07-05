import { NextRequest, NextResponse } from "next/server";

interface ChatRequestBody {
  name: string;
  phone: string;
  messages?: string[];
}

/* ─────────────────────────────────────────────────────
   In-memory rate limiter: 5 requests per IP per minute
   ───────────────────────────────────────────────────── */
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/* cleanup expired entries every 5 minutes to avoid memory leak */
/* guard against double-init during Next.js hot-reload in dev */
const g = globalThis as unknown as { __rlCleanup?: ReturnType<typeof setInterval> };
if (!g.__rlCleanup) {
  g.__rlCleanup = setInterval(() => {
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
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return { ok: false, retryAfter };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    /* ── rate limit check ── */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { ok, retryAfter } = checkRateLimit(ip);
    if (!ok) {
      return NextResponse.json(
        { error: `Слишком много запросов. Попробуйте через ${retryAfter} сек.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }

    const body: ChatRequestBody = await request.json();
    const { name, phone, messages } = body;

    /* ── validation ── */
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 },
      );
    }

    /* ── env vars ── */
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials not configured");
      return NextResponse.json(
        { error: "Сервис уведомлений не настроен" },
        { status: 500 },
      );
    }

    /* ── build message ── */
    const now = new Date();
    const dateStr = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let text = `📋 <b>Новая заявка из чата</b>\n\n`;
    text += `👤 <b>Имя:</b> ${escapeHtml(name.trim())}\n`;
    text += `📞 <b>Телефон:</b> ${escapeHtml(phone.trim())}\n`;
    text += `🕐 <b>Дата:</b> ${dateStr}\n`;

    const userMessages = Array.isArray(messages)
      ? messages.filter((m): m is string => typeof m === "string")
      : [];

    if (userMessages.length > 0) {
      text += `\n💬 <b>Сообщения из чата:</b>\n`;
      for (const msg of userMessages.slice(-10)) {
        text += `• ${escapeHtml(msg)}\n`;
      }
    }

    /* ── send to Telegram ── */
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "Не удалось отправить уведомление" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Chat request error:", err);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
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
