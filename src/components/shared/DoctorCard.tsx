"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface DoctorCardProps {
  name: string;
  specialization: string;
  experience?: number;
  photo: string;
  slug: string;
  bio?: string;
  variant?: "grid" | "featured";
}

export default function DoctorCard({
  name,
  specialization,
  experience,
  photo,
  slug,
}: DoctorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={`/doctors/${slug}`}
        className="group block rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1">
            {name}
          </h3>
          <p className="text-xs text-text-secondary mb-1">{specialization}</p>
          {experience !== undefined && (
            <p className="text-xs text-primary font-medium">
              Стаж {experience}{" "}
              {experience === 1
                ? "год"
                : experience < 5
                ? "года"
                : "лет"}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
