"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import BookingForm from "@/components/shared/BookingForm";

interface BookingCTAProps {
  title?: string;
  subtitle?: string;
}

export default function BookingCTA({
  title = "Запишитесь на бесплатную консультацию",
  subtitle = "Успейте получить консультацию совершенно бесплатно. Мы подберём оптимальный план лечения.",
}: BookingCTAProps) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white" id="booking">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">{subtitle}</p>
              <div className="space-y-4 text-white/70 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent font-bold text-xs">1</span>
                  <span>Бесплатная консультация и диагностика</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent font-bold text-xs">2</span>
                  <span>Составление плана лечения с прозрачной стоимостью</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent font-bold text-xs">3</span>
                  <span>Возможность рассрочки на услуги</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl p-6 shadow-elevated">
              <BookingForm variant="page" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
