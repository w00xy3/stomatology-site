import { describe, it, expect, vi, beforeEach } from "vitest";

/* ── mock Telegram fetch ── */
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

/* ── helper ── */
function makeRequest(body: object, ip = "1.2.3.4") {
  const { NextRequest } = require("next/server");
  return new NextRequest("http://localhost:3000/api/chat-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

/* ═══════════════════════════════════════════
   API Route: /api/chat-request
   ═══════════════════════════════════════════ */
describe("POST /api/chat-request", () => {
  /* We re-import the module before each test to reset the in-memory rate limiter */
  let POST: (req: import("next/server").NextRequest) => Promise<Response>;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();

    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";

    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("ok"),
    });

    const mod = await import("@/app/api/chat-request/route");
    POST = mod.POST;
  });

  /* ── validation ── */
  it("returns 400 if name is missing", async () => {
    const res = await POST(makeRequest({ phone: "+7 (912) 345-67-89" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/имя/i);
  });

  it("returns 400 if phone is missing", async () => {
    const res = await POST(makeRequest({ name: "Иван" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/телефон/i);
  });

  it("returns 400 if both fields are empty", async () => {
    const res = await POST(makeRequest({ name: "  ", phone: "  " }));
    expect(res.status).toBe(400);
  });

  /* ── missing env vars ── */
  it("returns 500 if Telegram credentials are missing", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    /* re-import with cleared env */
    const mod = await import("@/app/api/chat-request/route");
    const freshPOST = mod.POST;

    const res = await freshPOST(makeRequest({ name: "Иван", phone: "+79123456789" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/не настроен/i);
  });

  /* ── successful request ── */
  it("sends message to Telegram and returns success", async () => {
    const res = await POST(makeRequest({
      name: "Иван",
      phone: "+7 (912) 345-67-89",
      messages: ["Хочу записаться"],
    }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain("api.telegram.org");
    expect(url).toContain("test-token");
    const body = JSON.parse(options.body);
    expect(body.chat_id).toBe("123456");
    expect(body.text).toContain("Иван");
    expect(body.text).toContain("912) 345-67-89");
    expect(body.text).toContain("Хочу записаться");
    expect(body.parse_mode).toBe("HTML");
  });

  it("filters non-string messages from array", async () => {
    const res = await POST(makeRequest({
      name: "Иван",
      phone: "+79123456789",
      messages: ["valid", 123, null, "also valid"] as unknown[],
    }));
    expect(res.status).toBe(200);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    /* check the messages section specifically — don't use broad toContain since date/other text may include '123' */
    const messagesSection = body.text.split("Сообщения из чата")[1] ?? "";
    expect(messagesSection).toContain("valid");
    expect(messagesSection).toContain("also valid");
    /* the raw number 123 from the array should be filtered out — it won't appear as a bullet point */
    expect(messagesSection).not.toMatch(/^• 123$/m);
  });

  /* ── Telegram API failure ── */
  it("returns 502 if Telegram API fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve("Bad Request"),
    });

    const res = await POST(makeRequest({ name: "Иван", phone: "+79123456789" }));
    expect(res.status).toBe(502);
    const json = await res.json();
    expect(json.error).toMatch(/не удалось/i);
  });

  /* ── HTML escaping ── */
  it("escapes HTML special characters in name and phone", async () => {
    await POST(makeRequest({
      name: '<script>alert("xss")</script>',
      phone: "+79123456789",
    }));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.text).not.toContain("<script>");
    expect(body.text).toContain("&lt;script&gt;");
    expect(body.text).toContain("&quot;");
  });

  it("escapes single quotes", async () => {
    await POST(makeRequest({ name: "O'Brien", phone: "+79123456789" }));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.text).toContain("O&#39;Brien");
  });

  /* ── rate limiting ── */
  it("returns 429 after too many requests from same IP", async () => {
    const payload = { name: "Иван", phone: "+79123456789" };

    /* send 5 allowed requests */
    for (let i = 0; i < 5; i++) {
      const res = await POST(makeRequest(payload));
      expect(res.status).toBe(200);
    }

    /* 6th should be rate limited */
    const blocked = await POST(makeRequest(payload));
    expect(blocked.status).toBe(429);
    const json = await blocked.json();
    expect(json.error).toMatch(/слишком много/i);
  });

  it("includes Retry-After header when rate limited", async () => {
    const payload = { name: "Иван", phone: "+79123456789" };

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(payload));
    }

    const blocked = await POST(makeRequest(payload));
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });

  /* ── error handling ── */
  it("returns 500 on unexpected error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const res = await POST(makeRequest({ name: "Иван", phone: "+79123456789" }));
    expect(res.status).toBe(500);
  });
});
