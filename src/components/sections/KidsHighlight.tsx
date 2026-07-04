"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { Baby } from "@/components/icons";

export default function KidsHighlight() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <Image
                src="/images/services/kids-stomatosha.webp"
                alt="Детская стоматология Стоматоша"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 text-accent text-sm font-medium mb-4 border border-accent/10">
                <Baby className="w-4 h-4" />
                Для детей
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Детская стоматология «Стоматоша»
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Детский кабинет «Стоматоша» — это место, где ваш ребёнок будет чувствовать
                себя комфортно. Мы оказываем высокопрофессиональные медицинские услуги,
                используя новейшие методы лечения и ценный опыт работы с детьми.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Безболезненное лечение под седацией",
                  "Индивидуальный подход к каждому малышу",
                  "Современные материалы и оборудование",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/services/detskaya-stomatologiya" variant="primary" size="md">
                Подробнее о детской стоматологии
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
