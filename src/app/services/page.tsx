import { services } from "@/data/services";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import ServiceCard from "@/components/shared/ServiceCard";
import BookingCTA from "@/components/sections/BookingCTA";
import { getServiceIcon } from "@/components/icons/service-icon-map";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Услуги стоматологии
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Полный спектр лечения зубов для детей и взрослых в Ставрополе и Москве
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={getServiceIcon(service.icon)}
                  href={`/services/${service.slug}`}
                  subServices={service.subServices.map((s) => s.title)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
