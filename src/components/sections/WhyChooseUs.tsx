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
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Почему выбирают нас"
          subtitle="Мы создаём комфортные условия для каждого пациента"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
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
