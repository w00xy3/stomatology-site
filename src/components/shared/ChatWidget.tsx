"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar, Phone, User } from "@/components/icons";

/* ───────────── types ───────────── */
interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

type BookingStatus = "idle" | "submitting" | "success" | "error";

/* ───────────── bot auto-reply logic ───────────── */
const autoReplies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["привет", "здравствуйте", "добрый день", "доброе утро", "добрый вечер"],
    reply: "Здравствуйте! 👋 Рады приветствовать вас в «Доме Стоматологии». Чем могу помочь?",
  },
  {
    keywords: ["запис", "приём", "консультац", "записаться", "попасть"],
    reply: "Вы можете записаться через кнопку «Записаться на приём» ниже 👇 или позвонить по телефону +7 (865) 225-72-95.",
  },
  {
    keywords: ["цена", "стоимость", "сколько стоит", "прайс", "цены"],
    reply: "Актуальные цены вы можете посмотреть в разделе «Прайс-лист» на нашем сайте. Стоимость зависит от объёма лечения. Точную цену врач назовёт на бесплатной консультации.",
  },
  {
    keywords: ["адрес", "где находитесь", "как добраться", "расположен"],
    reply: "У нас три филиала:\n📍 Ставрополь, ул. Орджоникидзе, 1\n📍 Ставрополь, ул. Серова, 470/2\n📍 Москва, ул. Адмирала Лазарева, 52-3",
  },
  {
    keywords: ["работа", "режим", "часы", "когда работаете", "график"],
    reply: "Мы работаем:\n🕐 Пн–Сб: 9:00–20:00\nВс — выходной\n\nМосковский филиал: Пн–Сб 9:00–21:00, Вс 10:00–21:00",
  },
  {
    keywords: ["имплант", "имплантац"],
    reply: "Мы устанавливаем импланты SMILEA и Osstem, включая одномоментную имплантацию. Стоимость от 15 000 ₽. Запишитесь на бесплатную консультацию для точного расчёта!",
  },
  {
    keywords: ["отбел", "белые зубы"],
    reply: "Профессиональное отбеливание Beyond — до 10 тонов за одну процедуру (24 000 ₽). Также доступно химическое отбеливание и глубокое фторирование.",
  },
  {
    keywords: ["брекет", "прикус", "элайнер", "капы", "ортодонт"],
    reply: "Исправляем прикус брекетами Damon и прозрачными элайн-капами. Стоимость от 55 000 ₽ (элайнеры) и от 111 477 ₽ (брекеты). На консультации подберём оптимальный вариант.",
  },
  {
    keywords: ["дети", "ребёнок", "малыш", "стоматоша", "детск"],
    reply: "В нашем детском кабинете «Стоматоша» — комфортная атмосфера и бережный подход. Лечение кариеса, профессиональная гигиена, седация закисью азота для тревожных малышей 🧸",
  },
  {
    keywords: ["удален", "удалить зуб", "зуб мудрости"],
    reply: "Выполняем простое и сложное удаление зубов, включая ретинированные зубы мудрости. Стоимость от 1 500 ₽. Все манипуляции проводятся с качественным обезболиванием.",
  },
  {
    keywords: ["телефон", "номер", "позвонить", "связаться"],
    reply: "Позвоните нам:\n📞 Ставрополь: +7 (865) 225-72-95\n📞 Москва: +7 (495) 714-05-00\n✉️ Email: dom_stom@mail.ru",
  },
  {
    keywords: ["спасибо", "благодар", "отлично"],
    reply: "Всегда рады помочь! 😊 Если появятся вопросы — пишите, мы на связи.",
  },
];

function getBotReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const { keywords, reply } of autoReplies) {
    if (keywords.some((kw) => lower.includes(kw))) return reply;
  }
  return "Спасибо за обращение! Наш оператор ответит вам в ближайшее время. Вы также можете позвонить нам: +7 (865) 225-72-95.";
}

/* ───────── helpers ───────── */
function makeMsg(text: string, sender: "user" | "bot"): ChatMessage {
  return { id: crypto.randomUUID(), text, sender, timestamp: Date.now() };
}

function formatTime(epoch: number) {
  return new Date(epoch).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const quickReplies = ["Записаться на приём", "Узнать цены", "Режим работы"];

/* ── phone mask: +7 (XXX) XXX-XX-XX ── */
function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "");
  /* strip leading 7 or 8 if user typed it */
  const d = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;

  let result = "+7";
  if (d.length > 0) result += " (" + d.slice(0, 3);
  if (d.length >= 3) result += ")";
  if (d.length > 3) result += " " + d.slice(3, 6);
  if (d.length > 6) result += "-" + d.slice(6, 8);
  if (d.length > 8) result += "-" + d.slice(8, 10);

  return result;
}

function rawDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^(7|8)/, "");
}

const WELCOME_TEXT =
  "Здравствуйте! 👋 Я — виртуальный помощник «Дома Стоматологии». Задайте вопрос, и я постараюсь помочь!";

/* ───────── component ───────── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    makeMsg(WELCOME_TEXT, "bot"),
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── booking form state ── */
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [bookingError, setBookingError] = useState("");

  /* scroll to bottom on new messages */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* focus input when chat opens */
  useEffect(() => {
    if (isOpen && !showBookingForm) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showBookingForm]);

  /* ── chat send logic ── */
  const sendText = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, makeMsg(trimmed, "user")]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, makeMsg(getBotReply(trimmed), "bot")]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }, []);

  const handleSend = useCallback(() => sendText(input), [input, sendText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── booking submission ── */
  const handleBookingSubmit = useCallback(async () => {
    const name = bookingName.trim();
    const phone = bookingPhone.trim();
    if (!name || rawDigits(phone).length < 10) return;

    setBookingStatus("submitting");
    setBookingError("");

    try {
      const userMessages = messages
        .filter((m) => m.sender === "user")
        .map((m) => m.text);

      const res = await fetch("/api/chat-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, messages: userMessages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Ошибка отправки");
      }

      setBookingStatus("success");

      /* add confirmation message to chat */
      setMessages((prev) => [
        ...prev,
        makeMsg(
          `✅ Заявка отправлена! Имя: ${name}, Телефон: ${phone}. Мы свяжемся с вами в ближайшее время!`,
          "bot",
        ),
      ]);

      /* reset form after delay — give user time to read confirmation */
      setTimeout(() => {
        setShowBookingForm(false);
        setBookingName("");
        setBookingPhone("");
        setBookingStatus("idle");
      }, 4500);
    } catch (err) {
      setBookingStatus("error");
      setBookingError(
        err instanceof Error ? err.message : "Не удалось отправить заявку",
      );
    }
  }, [bookingName, bookingPhone, messages]);

  const handleBookingKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBookingSubmit();
    }
  };

  return (
    <>
      {/* ───────── floating toggle button ───────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 cursor-pointer hover:bg-primary-dark transition-colors duration-200 md:h-16 md:w-16 md:bottom-8 md:right-8"
            aria-label="Открыть чат поддержки"
          >
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/30 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ───────── chat window ───────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, originX: 1, originY: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 24,
              mass: 0.8,
              opacity: { duration: 0.2 },
            }}
            className="fixed bottom-6 right-4 z-[100] flex flex-col overflow-hidden rounded-2xl bg-surface shadow-elevated border border-border/60
              w-[calc(100vw-2rem)] max-w-[380px] h-[min(560px,75vh)]
              md:bottom-8 md:right-8"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-primary px-4 py-3 shrink-0">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold">
                  ДС
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  Дом Стоматологии
                </p>
                <p className="text-white/70 text-xs">Онлайн · ответим за пару минут</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Закрыть чат"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-surface text-text-primary border border-border/60 rounded-bl-md shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === "user" ? "text-white/60" : "text-text-muted"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border/60 bg-surface px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* quick replies */}
            {messages.length <= 1 && !showBookingForm && (
              <div className="flex gap-2 px-4 py-2 overflow-x-auto shrink-0 bg-surface border-t border-border/40">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendText(qr)}
                    className="shrink-0 rounded-full border border-primary/30 bg-primary-soft/40 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary-soft transition-colors cursor-pointer"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* ── booking form overlay ── */}
            <AnimatePresence>
              {showBookingForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="overflow-hidden shrink-0 border-t border-border/60 bg-surface"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-text-primary">
                        📋 Запись на приём
                      </p>
                      <button
                        onClick={() => {
                          setShowBookingForm(false);
                          setBookingStatus("idle");
                          setBookingError("");
                        }}
                        className="p-1 rounded-lg hover:bg-background-alt transition-colors cursor-pointer"
                        aria-label="Закрыть форму"
                      >
                        <X className="w-4 h-4 text-text-muted" />
                      </button>
                    </div>

                    {bookingStatus === "success" ? (
                      <div className="text-center py-4">
                        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">✓</span>
                        </div>
                        <p className="text-sm font-medium text-success">
                          Заявка отправлена!
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          Мы свяжемся с вами в ближайшее время
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* name */}
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            onKeyDown={handleBookingKeyDown}
                            placeholder="Ваше имя"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all"
                          />
                        </div>

                        {/* phone */}
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="tel"
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(formatPhoneMask(e.target.value))}
                            onKeyDown={handleBookingKeyDown}
                            placeholder="+7 (___) ___-__-__"
                            inputMode="tel"
                            maxLength={18}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 transition-all"
                          />
                        </div>

                        {bookingError && (
                          <p className="text-xs text-error">{bookingError}</p>
                        )}

                        <button
                          onClick={handleBookingSubmit}
                          disabled={
                            !bookingName.trim() ||
                            rawDigits(bookingPhone).length < 10 ||
                            bookingStatus === "submitting"
                          }
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold transition-all hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:shadow-md hover:shadow-accent/20"
                        >
                          {bookingStatus === "submitting" ? (
                            <>
                              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Отправляем…
                            </>
                          ) : (
                            <>
                              <Calendar className="w-4 h-4" />
                              Отправить заявку
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* input area */}
            <div className="shrink-0 border-t border-border/60 bg-surface">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишите сообщение…"
                  className="flex-1 bg-background-alt rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  aria-label="Отправить сообщение"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* ── always-visible booking button ── */}
              {!showBookingForm && bookingStatus !== "success" && (
                <div className="px-3 pb-2.5">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold transition-all hover:bg-accent-light cursor-pointer shadow-sm hover:shadow-md hover:shadow-accent/20 active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4" />
                    Записаться на приём
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
