"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUp } from "@/components/icons";

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt: string;
  coverUrl: string;
  slug: string;
}

export default function ArticleCard({
  title,
  date,
  excerpt,
  coverUrl,
  slug,
}: ArticleCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={`/articles/${slug}`} className="block group h-full">
        <div className="rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/20 relative">
          {/* Subtle gradient accent on hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${coverUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5 flex flex-col flex-1 relative">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </div>
            <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
              {excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
              Читать далее
              <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
