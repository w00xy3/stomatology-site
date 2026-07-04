"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";
import { branches } from "@/data/contacts";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface BookingFormProps {
  preselectedService?: string;
  preselectedDoctor?: string;
  preselectedBranch?: string;
  variant?: "inline" | "modal" | "page";
}

export default function BookingForm({
  preselectedService,
  preselectedDoctor,
  preselectedBranch,
  variant = "inline",
}: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: preselectedService || "",
    doctor: preselectedDoctor || "",
    branch: preselectedBranch || "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Заявка отправлена!
        </h3>
        <p className="text-text-secondary">
          Мы свяжемся с вами в ближайшее время для подтверждения записи.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="service" className="block text-sm font-medium text-text-primary">
            Услуга
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Выберите услугу</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="doctor" className="block text-sm font-medium text-text-primary">
            Врач
          </label>
          <select
            id="doctor"
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Любой врач</option>
            {doctors
              .filter((d) => !["nurse", "technician", "admin"].includes(d.category))
              .map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="branch" className="block text-sm font-medium text-text-primary">
          Филиал
        </label>
        <select
          id="branch"
          value={form.branch}
          onChange={(e) => setForm({ ...form, branch: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">Выберите филиал</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.city}, {b.address}
            </option>
          ))}
        </select>
      </div>
      <Input
        name="comment"
        type="textarea"
        label="Комментарий"
        placeholder="Опишите вашу проблему или пожелания"
        value={form.comment}
        onChange={(v) => setForm({ ...form, comment: v })}
      />
      <Button
        type="submit"
        variant="accent"
        size="lg"
        fullWidth={variant !== "inline"}
        isLoading={isSubmitting}
      >
        Записаться на приём
      </Button>
    </form>
  );
}
