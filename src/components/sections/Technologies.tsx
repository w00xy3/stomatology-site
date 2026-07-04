"use client";

import { technologies } from "@/data/technologies";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "@/components/icons";

export default function Technologies() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Наши технологии"
          subtitle="Современное оборудование для точной диагностики и качественного лечения"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <StaggerItem key={tech.slug}>
              <Link
                href={`/services/tsifrovaya-stomatologiya`}
                className="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full"
              >
                {tech.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tech.image}
                      alt={tech.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-4">
                    {tech.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">
                    Подробнее
                    <ArrowUp className="w-4 h-4 rotate-45" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
