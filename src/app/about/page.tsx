import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import BookingCTA from "@/components/sections/BookingCTA";
import { Calendar, Users, Building2, Award } from "@/components/icons";

const stats = [
  { icon: <Calendar className="w-7 h-7" />, value: "25+", label: "лет опыта" },
  { icon: <Users className="w-7 h-7" />, value: "20 000+", label: "пациентов" },
  { icon: <Building2 className="w-7 h-7" />, value: "3", label: "клиники" },
  { icon: <Award className="w-7 h-7" />, value: "20+", label: "специалистов" },
];

const directions = [
  "Имплантация и восстановление зубов",
  "Протезирование (коронки, мосты, съёмные протезы)",
  "Терапевтическая стоматология",
  "Ортодонтия (брекеты, элайнеры)",
  "Пародонтология",
  "Отбеливание зубов",
  "Детская стоматология «Стоматоша»",
  "Цифровая стоматология CAD/CAM",
];

const timeline = [
  { year: "1992", text: "Основание клиники. Начало работы в Ставрополе." },
  { year: "2004", text: "Регистрация ООО «Дом Стоматологии». Учредители: Локтев А.А., Локтева Ж.Б." },
  { year: "2010", text: "Расширение клиники. Открытие зуботехнической лаборатории." },
  { year: "2018", text: "Внедрение цифровых технологий CAD/CAM. Установка системы CEREC." },
  { year: "2020", text: "Открытие детского кабинета «Стоматоша»." },
  { year: "2023", text: "Открытие филиала в Москве." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            О компании «Дом Стоматологии»
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Сеть клиник в Ставрополе и Москве. Более 25 лет заботимся о здоровье ваших зубов.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center p-6 bg-white rounded-2xl shadow-card">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-background-alt">
        <div className="container-custom">
          <SectionHeader title="Наша история" />
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {item.year}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-primary/20 mt-2" />
                    )}
                  </div>
                  <p className="text-text-secondary leading-relaxed pt-3">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title="Основные направления" />
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {directions.map((dir, i) => (
              <ScrollReveal key={dir} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-text-primary">{dir}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
