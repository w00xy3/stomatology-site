"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Sparkles } from "@/components/icons";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/images/interior/hero-banner.webp"
          alt="Интерьер клиники Дом Стоматологии"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-900/80" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pattern-dots" />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          Более 25 лет заботимся о вашей улыбке
        </motion.div>
        <h1 className="relative flex justify-center">
          {/* Glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
            className="absolute inset-0 -m-24 bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25 rounded-full blur-[120px]"
          />
          {/* Logo entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {/* Gentle float after entrance */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Дом Стоматологии"
                width={413}
                height={96}
                className="h-14 md:h-20 lg:h-24 w-auto brightness-0 invert drop-shadow-xl"
                priority
              />
            </motion.div>
          </motion.div>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Запишитесь на бесплатную консультацию и получите план лечения
          с прозрачной стоимостью
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contacts#booking" variant="accent" size="lg">
            Записаться на бесплатную консультацию
          </Button>
          <Button href="/services" variant="ghost" size="lg" className="text-white hover:text-white hover:bg-white/10 border border-white/20">
            Наши услуги
          </Button>
        </motion.div>
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-light" />
            <span>3 клиники</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-light" />
            <span>20+ специалистов</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-light" />
            <span>20 000+ пациентов</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
