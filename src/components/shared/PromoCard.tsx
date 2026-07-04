"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUp, Sparkles } from "@/components/icons";

interface PromoCardProps {
  title: string;
  description: string;
  expiresAt?: string;
  href?: string;
}

export default function PromoCard({
  title,
  description,
  expiresAt,
  href,
}: PromoCardProps) {
  const content = (
    <div className="relative bg-gradient-to-br from-primary via-primary-dark to-primary rounded-2xl p-6 text-white h-full flex flex-col overflow-hidden group">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors duration-500" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      
      <div className="relative flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-white/80 text-sm leading-relaxed flex-1 relative">{description}</p>
      {expiresAt && (
        <div className="flex items-center gap-2 mt-4 text-white/60 text-xs relative">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            до{" "}
            {new Date(expiresAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      {href && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-4 relative group-hover:gap-2 transition-all">
          Подробнее
          <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </motion.div>
    );
  }
  return content;
}
