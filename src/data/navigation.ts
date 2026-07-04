import type { NavItem } from "./types";

export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Врачи", href: "/doctors" },
  { label: "Прайс", href: "/price" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

export const footerNavItems: NavItem[] = [
  { label: "О компании", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Врачи", href: "/doctors" },
  { label: "Прайс-лист", href: "/price" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Акции", href: "/promotions" },
  { label: "Статьи", href: "/articles" },
  { label: "Контакты", href: "/contacts" },
  { label: "Политика конфиденциальности", href: "/privacy" },
];
