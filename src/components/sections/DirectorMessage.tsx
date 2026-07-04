"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DirectorMessage() {
  return (
    <section className="section-padding bg-background-alt">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/doctors/loktev-aa.webp"
                alt="Локтев Александр Алексеевич — директор клиники"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Слово директора
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Локтев Александр Алексеевич
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Уже более 25 лет наша клиника помогает жителям Ставрополя и Москвы
                  обрести здоровую и красивую улыбку. Мы строим нашу работу на принципах
                  ответственности, открытости и командной работы.
                </p>
                <p>
                  Каждый пациент для нас — это не просто зубы, а человек, который доверяет
                  нам самое ценное — своё здоровье. Мы гордимся тем, что многие семьи
                  обслуживаются у нас на протяжении нескольких поколений.
                </p>
                <p>
                  В нашей клинике вы найдёте современное оборудование, качественные материалы
                  и, самое главное, команду профессионалов, которые любят свою работу.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div>
                  <p className="font-semibold text-text-primary">Локтев А.А.</p>
                  <p className="text-sm text-text-muted">Директор, врач стоматолог-ортопед, стаж 38 лет</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
