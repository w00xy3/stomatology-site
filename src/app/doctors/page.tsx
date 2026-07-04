"use client";

import { useState } from "react";
import { doctors } from "@/data/doctors";
import type { Doctor } from "@/data/types";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import DoctorCard from "@/components/shared/DoctorCard";
import BookingCTA from "@/components/sections/BookingCTA";

const categories: { label: string; value: Doctor["category"] | "all" }[] = [
  { label: "Все", value: "all" },
  { label: "Терапевты", value: "therapist" },
  { label: "Хирурги", value: "surgeon" },
  { label: "Ортодонты", value: "orthodontist" },
  { label: "Ортопеды", value: "orthopedist" },
  { label: "Детские", value: "pediatric" },
  { label: "Техники", value: "technician" },
];

export default function DoctorsPage() {
  const [activeCategory, setActiveCategory] = useState<Doctor["category"] | "all">("all");

  const filteredDoctors =
    activeCategory === "all"
      ? doctors
      : doctors.filter((d) => d.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Наша команда
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Профессиональные врачи с многолетним опытом работы
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background-alt border-b border-border sticky top-16 lg:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-text-secondary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
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
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
