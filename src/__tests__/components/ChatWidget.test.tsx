import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

/* ── mock framer-motion BEFORE import ── */
vi.mock("framer-motion", () => {
  const ANIM_KEYS = new Set([
    "initial", "animate", "exit", "transition",
    "whileHover", "whileTap", "variants", "layout",
    "originX", "originY",
  ]);

  const stripAnim = (props: Record<string, unknown>) => {
    const cleaned: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (!ANIM_KEYS.has(key)) cleaned[key] = props[key];
    }
    return cleaned;
  };

  /* cache so React gets stable component references across re-renders */
  const componentCache = new Map<string, React.ComponentType<Record<string, unknown>>>();

  return {
    motion: new Proxy({} as Record<string, React.ComponentType<Record<string, unknown>>>, {
      get: (_target, tag: string) => {
        if (!componentCache.has(tag)) {
          const Comp = React.forwardRef((props: Record<string, unknown>, ref) =>
            React.createElement(tag, { ...stripAnim(props), ref }),
          );
          Comp.displayName = `Motion${tag}`;
          componentCache.set(tag, Comp as unknown as React.ComponentType<Record<string, unknown>>);
        }
        return componentCache.get(tag)!;
      },
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

/* ── mock icons ── */
vi.mock("@/components/icons", () => ({
  MessageCircle: () => React.createElement("span", { "data-testid": "icon-message" }),
  X: (props: Record<string, unknown>) => React.createElement("span", props),
  Send: () => React.createElement("span", { "data-testid": "icon-send" }),
  Calendar: () => React.createElement("span", { "data-testid": "icon-calendar" }),
  Phone: () => React.createElement("span", { "data-testid": "icon-phone" }),
  User: () => React.createElement("span", { "data-testid": "icon-user" }),
  Headphones: () => React.createElement("span", { "data-testid": "icon-headphones" }),
}));

/* ── import AFTER mocks ── */
import ChatWidget from "@/components/shared/ChatWidget";

/* ═══════════════════════════════════════════
   ChatWidget Component Tests
   ═══════════════════════════════════════════ */
describe("ChatWidget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ── initial render ── */
  it("renders the floating chat button", () => {
    render(React.createElement(ChatWidget));
    expect(screen.getByLabelText("Открыть чат поддержки")).toBeInTheDocument();
  });

  it("opens chat window when button is clicked", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    expect(screen.getByText("Дом Стоматологии")).toBeInTheDocument();
    expect(screen.getByLabelText("Закрыть чат")).toBeInTheDocument();
  });

  it("displays welcome message on open", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    expect(screen.getByText(/Здравствуйте!/)).toBeInTheDocument();
    expect(screen.getByText(/виртуальный помощник/)).toBeInTheDocument();
  });

  it("shows quick replies on first open", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    /* quick replies appear as chips */
    expect(screen.getByText("Записаться на приём")).toBeInTheDocument();
    expect(screen.getByText("Узнать цены")).toBeInTheDocument();
    expect(screen.getByText("Режим работы")).toBeInTheDocument();
    /* action buttons also visible */
    expect(screen.getByText("Записаться")).toBeInTheDocument();
    expect(screen.getByText("Оператор")).toBeInTheDocument();
  });

  it("shows the booking button", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    expect(screen.getByText("Записаться")).toBeInTheDocument();
    expect(screen.getByText("Оператор")).toBeInTheDocument();
  });

  /* ── sending messages ── */
  it("sends a user message and shows bot reply", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    const input = screen.getByPlaceholderText("Напишите сообщение…");
    await user.type(input, "Привет");
    await user.click(screen.getByLabelText("Отправить сообщение"));

    expect(screen.getByText("Привет")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/Рады приветствовать/)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("clears input after sending", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    const input = screen.getByPlaceholderText("Напишите сообщение…");
    await user.type(input, "Тест");
    await user.click(screen.getByLabelText("Отправить сообщение"));

    expect(input).toHaveValue("");
  });

  it("does not send empty messages", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    expect(screen.getByLabelText("Отправить сообщение")).toBeDisabled();
  });

  /* ── booking form ── */
  it("opens booking form when booking button is clicked", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    /* click the "Записаться" action button */
    await user.click(screen.getByText("Записаться"));

    expect(screen.getByText("📋 Запись на приём")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ваше имя")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+7 (___) ___-__-__")).toBeInTheDocument();
  });

  it("submit button is disabled when fields are empty", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    await user.click(screen.getByText("Записаться"));

    expect(screen.getByText("Отправить заявку").closest("button")).toBeDisabled();
  });

  it("closes booking form when X is clicked", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));

    await user.click(screen.getByText("Записаться"));
    expect(screen.getByText("📋 Запись на приём")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Закрыть форму"));
    expect(screen.queryByText("📋 Запись на приём")).not.toBeInTheDocument();
  });

  /* ── phone mask ── */
  it("formats phone input with mask on paste", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));
    await user.click(screen.getByText("Записаться"));

    const phoneInput = screen.getByPlaceholderText("+7 (___) ___-__-__");
    await user.click(phoneInput);
    await user.paste("9123456789");

    expect(phoneInput).toHaveValue("+7 (912) 345-67-89");
  });

  it("handles phone input starting with 8 on paste", async () => {
    const user = userEvent.setup();
    render(React.createElement(ChatWidget));
    await user.click(screen.getByLabelText("Открыть чат поддержки"));
    await user.click(screen.getByText("Записаться"));

    const phoneInput = screen.getByPlaceholderText("+7 (___) ___-__-__");
    await user.click(phoneInput);
    await user.paste("89123456789");

    expect(phoneInput).toHaveValue("+7 (912) 345-67-89");
  });
});
