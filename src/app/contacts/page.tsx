"use client";

import { useState } from "react";
import { branches, messengerLink } from "@/data/contacts";
import BranchCard from "@/components/shared/BranchCard";
import BookingForm from "@/components/shared/BookingForm";
import ContactForm from "@/components/shared/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MessageCircle, MapPin } from "@/components/icons";

export default function ContactsPage() {
  const [activeBranch, setActiveBranch] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Контакты клиники
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Мы всегда рады видеть вас в наших клиниках
          </p>
        </div>
      </section>

      {/* Branches */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Branch Cards */}
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Наши филиалы
              </h2>
              <div className="space-y-4">
                {branches.map((branch, i) => (
                  <BranchCard
                    key={branch.id}
                    {...branch}
                    isActive={i === activeBranch}
                    onSelect={() => setActiveBranch(i)}
                  />
                ))}
              </div>
              {/* MAX messenger button */}
              <a
                href={messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Написать в MAX
              </a>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="h-[400px] lg:h-full min-h-[400px] bg-background-alt rounded-2xl flex items-center justify-center border border-border">
                <div className="text-center text-text-muted">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-text-muted/50" />
                  <p className="font-medium">Интерактивная карта</p>
                  <p className="text-sm mt-1">
                    {branches[activeBranch].city}, {branches[activeBranch].address}
                  </p>
                  <p className="text-xs mt-3 text-text-muted/60">
                    Яндекс Карта будет загружена здесь
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-background-alt" id="booking">
        <div className="container-custom max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                Записаться на приём
              </h2>
              <p className="text-text-secondary">
                Заполните форму и мы свяжемся с вами для подтверждения записи
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
              <BookingForm variant="page" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-3">
                Обратная связь
              </h2>
              <p className="text-text-secondary">
                Есть вопрос? Напишите нам, и мы ответим в ближайшее время
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
