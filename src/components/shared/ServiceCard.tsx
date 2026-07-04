"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUp } from "@/components/icons";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  subServices?: string[];
  variant?: "default" | "featured";
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  subServices,
  variant = "default",
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`h-full ${variant === "featured" ? "ring-2 ring-primary/20" : ""}`}
    >
      <Link
        href={href}
        className={`block rounded-2xl bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full`}
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        {subServices && subServices.length > 0 && (
          <ul className="space-y-1 mb-4">
            {subServices.slice(0, 4).map((s) => (
              <li key={s} className="text-xs text-text-muted flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
          Подробнее
          <ArrowUp className="w-4 h-4 rotate-45" />
        </span>
      </Link>
    </motion.div>
  );
}
