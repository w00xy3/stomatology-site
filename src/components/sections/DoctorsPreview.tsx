"use client";

import { getPreviewDoctors } from "@/data/doctors";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import DoctorCard from "@/components/shared/DoctorCard";
import Button from "@/components/ui/Button";

export default function DoctorsPreview() {
  const previewDoctors = getPreviewDoctors();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Наша команда"
          subtitle="Опытные специалисты, которые заботятся о вашем здоровье"
        />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewDoctors.map((doctor) => (
            <StaggerItem key={doctor.slug}>
              <DoctorCard
                name={doctor.name}
                specialization={doctor.specialization}
                experience={doctor.experience}
                photo={doctor.photo}
                slug={doctor.slug}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="text-center mt-10">
          <Button href="/doctors" variant="outline" size="md">
            Все специалисты
          </Button>
        </div>
      </div>
    </section>
  );
}
