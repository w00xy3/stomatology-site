# Интеграция технологического стека

> Руководство по связке Tailwind CSS + Framer Motion + Lenis в Next.js проекте.

---

## 1. Стек технологий

| Технология | Версия | Назначение |
|---|---|---|
| **Next.js** (App Router) | 14+ | Фреймворк, SSR/SSG, маршрутизация |
| **React** | 18+ | UI-библиотека |
| **TypeScript** | 5+ | Типизация |
| **Tailwind CSS** | v4 | Утилитарная стилизация |
| **Framer Motion** | 11+ | Анимации (scroll reveal, page transitions) |
| **Lenis** | 1+ | Плавный скролл |

---

## 2. Установка зависимостей

```bash
npm install tailwindcss @tailwindcss/postcss postcss framer-motion lenis
```

### postcss.config.mjs

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 3. Интеграция Lenis (плавный скролл)

### 3.1. Провайдер Lenis

Создать клиентский компонент-обёртку, который инициализирует Lenis один раз на уровне root layout.

**Файл:** `src/components/layout/SmoothScroll.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### 3.2. Подключение в Root Layout

**Файл:** `src/app/layout.tsx`

```tsx
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SmoothScroll>
          {/* Navbar, main content, Footer */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### 3.3. Хук useLenis (для программного управления)

**Файл:** `src/hooks/useLenis.ts`

```tsx
"use client";

import { useCallback } from "react";

/**
 * Программная прокрутка к элементу через Lenis.
 * Использование: scrollToSection("services")
 */
export function useLenis() {
  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset });
    }
  }, []);

  return { scrollTo };
}
```

### 3.4. Важные замечания по Lenis

- **SSR:** Lenis работает только в браузере. Всегда инициализируйте в `useEffect`.
- **Очистка:** Обязательно вызывайте `lenis.destroy()` в cleanup `useEffect`.
- **Mobile:** Параметр `touchMultiplier: 1.5` улучшает отзывчивость на тач-устройствах.
- **Якорные ссылки:** Используйте `lenis.scrollTo("#section")` вместо стандартного `href="#section"` для плавной прокрутки.
- **Производительность:** Lenis использует `requestAnimationFrame` — не конфликтует с Framer Motion.

---

## 4. Интеграция Framer Motion (анимации)

### 4.1. Общий подход

Framer Motion используется для:
1. **Scroll reveal** — появление секций при скролле (`whileInView`)
2. **Staggered animations** — последовательное появление элементов сетки
3. **Page transitions** — плавные переходы между страницами
4. **Hover/interaction** — микроанимации на карточках и кнопках

### 4.2. Утилита scroll-reveal

Создать переиспользуемый компонент-обёртку для анимации появления.

**Файл:** `src/components/ui/ScrollReveal.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
}: ScrollRevealProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 4.3. Утилита staggered-reveal

Для анимации сеток (услуги, врачи, отзывы).

**Файл:** `src/components/ui/StaggerContainer.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

### 4.4. Анимация Hero-секции

```tsx
// HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: 0 }}
        // Parallax через useScroll + useTransform
      />

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Дом Стоматологии
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-xl text-gray-600"
        >
          Запишись на бесплатную консультацию
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* CTA Button */}
        </motion.div>
      </div>
    </section>
  );
}
```

### 4.5. Анимация карточек (hover)

```tsx
// ServiceCard.tsx
"use client";

import { motion } from "framer-motion";

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block rounded-2xl bg-white p-6 shadow-sm
                 hover:shadow-lg transition-shadow duration-300"
    >
      {/* card content */}
    </motion.a>
  );
}
```

### 4.6. Page Transitions (опционально)

Для плавных переходов между страницами обернуть контент в `AnimatePresence`.

**Важно:** В Next.js App Router page transitions требуют кастомной обработки через `usePathname()`.

### 4.7. Важные замечания по Framer Motion

- **`viewport={{ once: true }}`** — анимация срабатывает только один раз. Экономит ресурсы.
- **`amount: 0.2`** — элемент появляется, когда 20% его площади видно.
- **GPU-ускорение:** Анимируйте только `transform` и `opacity` — они не вызывают reflow.
- **Accessibility:** Используйте `useReducedMotion()` для отключения анимаций:
  ```tsx
  import { useReducedMotion } from "framer-motion";
  const shouldReduceMotion = useReducedMotion();
  ```
- **Lazy loading:** Используйте `dynamic(() => import(...), { ssr: false })` для тяжёлых анимированных компонентов.

---

## 5. Tailwind CSS — конфигурация и соглашения

### 5.1. Глобальные стили и тема

**Файл:** `src/app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* === Цветовая палитра === */
  --color-primary: #0066CC;          /* Основной синий */
  --color-primary-light: #3399FF;    /* Светлый синий */
  --color-primary-dark: #004C99;     /* Тёмный синий */
  --color-accent: #F59E0B;           /* Акцентный жёлтый (CTA) */
  --color-accent-light: #FCD34D;     /* Светлый акцент */

  --color-surface: #FFFFFF;          /* Фон карточек */
  --color-background: #FAFBFC;       /* Общий фон страницы */
  --color-background-alt: #F1F5F9;   /* Альтернативный фон секций */

  --color-text-primary: #1A1A2E;     /* Основной текст */
  --color-text-secondary: #6B7280;   /* Вторичный текст */
  --color-text-muted: #9CA3AF;       /* Приглушённый текст */

  --color-border: #E5E7EB;           /* Границы */
  --color-success: #10B981;          /* Успешные операции */
  --color-error: #EF4444;            /* Ошибки */

  /* === Типографика === */
  --font-sans: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;

  /* === Тени === */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04);
  --shadow-elevated: 0 20px 40px rgba(0, 0, 0, 0.1);

  /* === Скругления === */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
}

/* === Базовые стили === */
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-background text-text-primary font-sans antialiased;
}

/* === Секции — стандартный отступ === */
.section-padding {
  @apply py-16 md:py-24 lg:py-32;
}

/* === Контейнер === */
.container-custom {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### 5.2. Соглашения по именованию классов

#### Порядок классов (логическая группировка)

```
1. Layout:        flex, grid, block, relative, absolute
2. Positioning:   top-0, left-0, inset-0, z-10
3. Box Model:     p-6, m-4, w-full, h-screen, max-w-7xl
4. Typography:    text-lg, font-bold, leading-tight, tracking-wide
5. Visuals:       bg-white, text-primary, rounded-xl, shadow-card
6. States:        hover:, focus:, active:, disabled:
7. Responsive:    sm:, md:, lg:, xl:
8. Transitions:   transition-all, duration-300, ease-in-out
```

**Пример:**
```tsx
<div className="
  relative              /* 1. Layout */
  z-10                  /* 2. Positioning */
  w-full max-w-7xl      /* 3. Box Model */
  mx-auto px-4          /* 3. Box Model (отступы) */
  text-center           /* 4. Typography */
  bg-white rounded-xl   /* 5. Visuals */
  shadow-card           /* 5. Visuals */
  hover:shadow-card-hover /* 6. States */
  transition-shadow     /* 8. Transitions */
  duration-300          /* 8. Transitions */
">
```

#### Правила

1. **Не более 5-7 классов в одну строку** — переносить на новую строку для читаемости.
2. **Использовать кастомные CSS-классы** только для повторяющихся паттернов (`.section-padding`, `.container-custom`).
3. **Не дублировать** — если одинаковые классы используются 3+ раз, вынести в компонент.
4. **Кастомные значения** — через `@theme`, не через произвольные значения (`arbitrary values`).
5. **Prettier Plugin** — установить `prettier-plugin-tailwindcss` для автоматической сортировки.

### 5.3. Адаптивные брейкпоинты

| Брейкпоинт | Префикс | Ширина | Использование |
|---|---|---|---|
| Mobile | (нет) | < 640px | Базовые стили (mobile-first) |
| sm | `sm:` | ≥ 640px | Большие телефоны |
| md | `md:` | ≥ 768px | Планшеты |
| lg | `lg:` | ≥ 1024px | Десктоп |
| xl | `xl:` | ≥ 1280px | Широкий десктоп |

**Паттерн для сеток:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* карточки */}
</div>
```

**Паттерн для типографики:**
```tsx
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
```

### 5.4. Типографика

| Элемент | Классы Tailwind | Применение |
|---|---|---|
| H1 (Hero) | `text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight` | Главный заголовок |
| H2 (Секция) | `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` | Заголовки секций |
| H3 (Подзаголовок) | `text-xl md:text-2xl font-semibold` | Заголовки карточек |
| Body large | `text-lg md:text-xl leading-relaxed` | Подзаголовки, описания |
| Body | `text-base leading-relaxed` | Основной текст |
| Body small | `text-sm text-text-secondary` | Подписи, даты, мета |
| CTA | `text-base font-semibold` | Кнопки |

---

## 6. Структура секций на страницах

### Стандартная секция

```tsx
<section className="section-padding">
  <div className="container-custom">
    {/* ScrollReveal обёртка для заголовка */}
    <ScrollReveal>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Заголовок секции
      </h2>
      <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
        Описание секции
      </p>
    </ScrollReveal>

    {/* Staggered сетка контента */}
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <StaggerItem key={item.id}>
          <Card {...item} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  </div>
</section>
```

### Секция с фоном (alternating)

```tsx
<section className="section-padding bg-background-alt">
  {/* ... */}
</section>
```

---

## 7. Accessibility

- **Reduced motion:** Проверять `useReducedMotion()` и отключать анимации.
- **Focus-visible:** Добавлять `focus-visible:ring-2 focus-visible:ring-primary` на интерактивные элементы.
- **Semantic HTML:** Использовать `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Alt-тексты:** Все изображения с описательным `alt`.
- **ARIA:** `aria-label` для иконок-кнопок, `aria-expanded` для мобильного меню.

---

## 8. Производительность

| Метрика | Цель | Как достичь |
|---|---|---|
| LCP | < 2.5s | `next/image` с `priority` для Hero, оптимизация шрифтов |
| FID | < 100ms |Ленивая загрузка анимаций, `dynamic()` для тяжёлых компонентов |
| CLS | < 0.1 | Фиксированные размеры изображений, `font-display: swap` |
| Bundle | < 200KB gzipped | Tree-shaking, динамические импорты |

### Динамические импорты

```tsx
import dynamic from "next/dynamic";

const MapWidget = dynamic(() => import("@/components/shared/MapWidget"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
});

const TechnologiesCarousel = dynamic(
  () => import("@/components/sections/Technologies"),
  { ssr: false }
);
```
