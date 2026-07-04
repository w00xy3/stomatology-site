"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { Zap, Monitor, Users } from "@/components/icons";

const advantages = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Инновационные материалы",
    description: "Используем последние разработки в сфере европейской стоматологии",
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    title: "Современное оборудование",
    description: "Оказываем стоматологические услуги максимально безопасно и качественно",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Профессиональные врачи",
    description: "Добрые и внимательные стоматологи помогут победить ваши страхи",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeader
          title="Почему выбирают нас"
          subtitle="Мы создаём комфортные условия для каждого пациента"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 text-center h-full border border-border/50 hover:border-primary/20 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 ${
                  i === 0 ? "bg-gradient-to-br from-primary/15 to-primary/5 text-primary" :
                  i === 1 ? "bg-gradient-to-br from-accent/15 to-accent/5 text-accent" :
                  "bg-gradient-to-br from-primary/15 to-accent/10 text-primary"
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
