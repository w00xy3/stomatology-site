"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { primaryPhone } from "@/data/contacts";
import { Phone, Menu, X } from "@/components/icons";
import Logo from "@/components/icons/Logo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass border-b border-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/40">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "text-white bg-primary shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${primaryPhone.replace(/[^\d+]/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {primaryPhone}
            </a>
            <Button href="/contacts#booking" variant="primary" size="sm">
              Записаться
            </Button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-border/40 hover:bg-white transition-colors shadow-sm"
              aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      pathname === item.href
                        ? "text-primary bg-primary-soft"
                        : "text-text-primary hover:bg-background-alt"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href={`tel:${primaryPhone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 px-4 py-3 text-text-primary"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-medium">{primaryPhone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
