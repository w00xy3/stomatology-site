"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Сообщение отправлено!
        </h3>
        <p className="text-text-secondary">
          Мы ответим вам в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Input
        name="name"
        label="Имя"
        placeholder="Ваше имя"
        required
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
      />
      <Input
        name="phone"
        type="tel"
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
        required
        value={form.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
      />
      <Input
        name="message"
        type="textarea"
        label="Сообщение"
        placeholder="Ваш вопрос или сообщение"
        required
        value={form.message}
        onChange={(v) => setForm({ ...form, message: v })}
      />
      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
        Отправить
      </Button>
    </form>
  );
}
