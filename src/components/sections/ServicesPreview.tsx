"use client";

import { getPreviewServices } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import ServiceCard from "@/components/shared/ServiceCard";
import Button from "@/components/ui/Button";
import { getServiceIcon } from "@/components/icons/service-icon-map";

export default function ServicesPreview() {
  const previewServices = getPreviewServices();

  return (
    <section className="section-padding bg-background-alt">
      <div className="container-custom">
        <SectionHeader
          title="Наши услуги"
          subtitle="Полный спектр стоматологических услуг для всей семьи"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service) => (
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
        <div className="text-center mt-10">
          <Button href="/services" variant="outline" size="md">
            Все услуги
          </Button>
        </div>
      </div>
    </section>
  );
}
