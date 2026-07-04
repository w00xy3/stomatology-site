# Архитектура компонентов

> Описание переиспользуемых компонентов, их пропсов и структуры.

---

## Каталог компонентов

```
src/components/
├── layout/
│   ├── Navbar.tsx              # Навигационная панель
│   ├── Footer.tsx              # Подвал сайта
│   ├── SmoothScroll.tsx        # Lenis-обёртка
│   └── MobileMenu.tsx          # Мобильное меню
│
├── ui/
│   ├── Button.tsx              # Кнопки (primary, secondary, outline, ghost)
│   ├── Badge.tsx               # Бейджи/теги
│   ├── Accordion.tsx           # Аккордеон (для прайса)
│   ├── Modal.tsx               # Модальное окно
│   ├── Input.tsx               # Поле ввода
│   ├── Select.tsx              # Выпадающий список
│   ├── Skeleton.tsx            # Загрузочный placeholder
│   ├── ScrollReveal.tsx        # Анимация появления
│   ├── StaggerContainer.tsx    # Staggered-анимация
│   └── SectionHeader.tsx       # Заголовок секции
│
├── sections/
│   ├── HeroSection.tsx         # Hero главной
│   ├── WhyChooseUs.tsx         # Преимущества
│   ├── DirectorMessage.tsx     # Слово директора
│   ├── KidsHighlight.tsx       # Детская стоматология
│   ├── ServicesPreview.tsx     # Превью услуг
│   ├── DoctorsPreview.tsx      # Превью врачей
│   ├── BookingCTA.tsx          # Блок записи
│   ├── ReviewsPreview.tsx      # Превью отзывов
│   ├── LatestNews.tsx          # Последние новости
│   ├── Technologies.tsx        # Технологии
│   └── PromotionsPreview.tsx   # Превью акций
│
├── shared/
│   ├── ServiceCard.tsx         # Карточка услуги
│   ├── DoctorCard.tsx          # Карточка врача
│   ├── ReviewCard.tsx          # Карточка отзыва
│   ├── ArticleCard.tsx         # Карточка статьи
│   ├── PromoCard.tsx           # Карточка акции
│   ├── BranchCard.tsx          # Карточка филиала
│   ├── PriceTable.tsx          # Таблица цен
│   ├── MapWidget.tsx           # Яндекс/Google карта
│   ├── BookingForm.tsx         # Форма записи
│   └── ContactForm.tsx         # Форма обратной связи
│
└── icons/
    └── index.tsx               # SVG-иконки
```

---

## Layout-компоненты

### Navbar

Навигационная панель с логотипом, меню и CTA-кнопкой.

```tsx
interface NavbarProps {
  /** Текущий путь для подсветки активного пункта */
  currentPath?: string;
}
```

**Поведение:**
- Sticky (`position: sticky; top: 0`)
- При скролле вниз > 100px: добавляется `backdrop-blur-md bg-white/90 shadow-sm`
- На мобильных: гамбургер → `<MobileMenu />`
- Логотип слева, навигация по центру, CTA справа
- Телефон отображается только на `lg:`

**Структура:**
```tsx
<nav>
  <div className="container-custom flex items-center justify-between h-16 lg:h-20">
    <Logo />
    <DesktopNav items={navItems} />
    <div className="flex items-center gap-4">
      <a href="tel:+78652257295" className="hidden lg:block">
        +7 (865) 225-72-95
      </a>
      <Button variant="primary" size="sm" href="/contacts#booking">
        Записаться
      </Button>
      <MobileMenuToggle />
    </div>
  </div>
</nav>
```

**Навигационные пункты:**
```ts
const navItems = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Врачи", href: "/doctors" },
  { label: "Прайс", href: "/price" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];
```

---

### Footer

Подвал сайта с навигацией, контактами и копирайтом.

```tsx
interface FooterProps {
  /** Не принимает пропсов — данные захардкожены или из CMS */
}
```

**Структура:**
```tsx
<footer className="bg-text-primary text-white">
  <div className="container-custom section-padding">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Колонка 1: Логотип + описание */}
      <FooterBrand />

      {/* Колонка 2: Навигация */}
      <FooterNav />

      {/* Колонка 3: Контакты филиалов */}
      <FooterContacts />

      {/* Колонка 4: Соцсети + мессенджеры */}
      <FooterSocial />
    </div>

    {/* Нижняя полоса: копирайт + политика */}
    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between">
      <p>© 2024 «Дом Стоматологии». Все права защищены.</p>
      <a href="/privacy">Политика конфиденциальности</a>
    </div>
  </div>
</footer>
```

---

### SmoothScroll

Обёртка Lenis для плавного скролла всего приложения.

```tsx
interface SmoothScrollProps {
  children: React.ReactNode;
}
```

> Подробности реализации см. в `tech-stack-integration.md`, раздел 3.

---

## UI-компоненты

### Button

Универсальная кнопка с вариантами стилизации.

```tsx
interface ButtonProps {
  /** Вариант стилизации */
  variant: "primary" | "secondary" | "outline" | "ghost" | "accent";
  /** Размер кнопки */
  size: "sm" | "md" | "lg";
  /** Содержимое */
  children: React.ReactNode;
  /** Ссылка (если задана, рендерится как <a>) */
  href?: string;
  /** Иконка слева */
  iconLeft?: React.ReactNode;
  /** Иконка справа */
  iconRight?: React.ReactNode;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Отключена */
  disabled?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные классы */
  className?: string;
}
```

**Стилизация по вариантам:**
```ts
const variants = {
  primary:   "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
  secondary: "bg-background-alt text-text-primary hover:bg-border",
  outline:   "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost:     "text-text-secondary hover:text-text-primary hover:bg-background-alt",
  accent:    "bg-accent text-text-primary hover:bg-accent-light font-semibold shadow-sm",
};
```

**Размеры:**
```ts
const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};
```

---

### Badge

Маленький тег/бейдж для меток.

```tsx
interface BadgeProps {
  /** Вариант */
  variant: "default" | "primary" | "success" | "warning" | "outline";
  /** Текст */
  children: React.ReactNode;
  /** Дополнительные классы */
  className?: string;
}
```

---

### Accordion

Раскрывающийся блок (для прайс-листа, FAQ).

```tsx
interface AccordionProps {
  /** Элементы аккордеона */
  items: AccordionItem[];
  /** Можно ли открывать несколько одновременно */
  allowMultiple?: boolean;
  /** Индекс открытого по умолчанию */
  defaultOpen?: number;
}

interface AccordionItem {
  /** Заголовок */
  title: string;
  /** Иконка/бейдж рядом с заголовком */
  badge?: string;
  /** Содержимое */
  content: React.ReactNode;
}
```

**Поведение:**
- Анимация раскрытия через `framer-motion` (`AnimatePresence` + `motion.div` с `height: "auto"`)
- Стрелка-индикатор поворачивается на 180°
- Доступность: `aria-expanded`, `aria-controls`

---

### Modal

Модальное окно (для форм записи, просмотра фото).

```tsx
interface ModalProps {
  /** Открыто/закрыто */
  isOpen: boolean;
  /** Обработчик закрытия */
  onClose: () => void;
  /** Заголовок */
  title?: string;
  /** Содержимое */
  children: React.ReactNode;
  /** Размер */
  size?: "sm" | "md" | "lg" | "full";
}
```

---

### Input

Поле ввода для форм.

```tsx
interface InputProps {
  /** Имя поля */
  name: string;
  /** Тип */
  type?: "text" | "email" | "tel" | "textarea";
  /** Placeholder */
  placeholder?: string;
  /** Лейбл */
  label?: string;
  /** Сообщение об ошибке */
  error?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Значение */
  value?: string;
  /** Обработчик изменения */
  onChange?: (value: string) => void;
}
```

---

### ScrollReveal

Обёртка для анимации появления при скролле.

```tsx
interface ScrollRevealProps {
  children: React.ReactNode;
  /** Направление появления */
  direction?: "up" | "down" | "left" | "right";
  /** Задержка (секунды) */
  delay?: number;
  /** Длительность (секунды) */
  duration?: number;
  /** CSS-классы */
  className?: string;
}
```

---

### StaggerContainer / StaggerItem

Контейнер для последовательного появления дочерних элементов.

```tsx
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}
```

---

### SectionHeader

Заголовок секции с подзаголовком.

```tsx
interface SectionHeaderProps {
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Выравнивание */
  align?: "left" | "center";
  /** Размер заголовка */
  size?: "md" | "lg";
  /** Доп. CSS-классы */
  className?: string;
}
```

---

## Shared-компоненты

### ServiceCard

Карточка услуги (для каталога услуг и превью на главной).

```tsx
interface ServiceCardProps {
  /** Название услуги */
  title: string;
  /** Краткое описание (2-3 строки) */
  description: string;
  /** Иконка услуги (React-компонент или SVG) */
  icon: React.ReactNode;
  /** Ссылка на детальную страницу */
  href: string;
  /** Список подуслуг (для детальной карточки) */
  subServices?: string[];
  /** Показать CTA-кнопку записи */
  showBookingCTA?: boolean;
  /** Вариант отображения */
  variant?: "default" | "featured";
}
```

**Визуал:**
- `rounded-2xl bg-white shadow-card hover:shadow-card-hover`
- Иконка сверху (или слева на `md:`)
- Hover: `translate-y-[-4px]` через Framer Motion
- CTA «Записаться» внизу карточки

---

### DoctorCard

Карточка врача (для сетки врачей и превью на главной).

```tsx
interface DoctorCardProps {
  /** Имя врача */
  name: string;
  /** Должность / специализация */
  specialization: string;
  /** Стаж работы (число лет) */
  experience: number;
  /** URL фото */
  photoUrl: string;
  /** Slug для ссылки на профиль */
  slug: string;
  /** Краткое описание (опционально) */
  bio?: string;
  /** Вариант отображения */
  variant?: "grid" | "featured";
}
```

**Визуал:**
- Фото 4:5 ratio, `rounded-xl object-cover`
- Hover: лёгкое увеличение фото (`scale: 1.03`)
- Имя, специализация, стаж
- Ссылка на профиль врача

---

### ReviewCard

Карточка отзыва.

```tsx
interface ReviewCardProps {
  /** Имя автора */
  authorName: string;
  /** Дата отзыва (ISO или строка) */
  date: string;
  /** Текст отзыва */
  text: string;
  /** Рейтинг (1-5) */
  rating?: number;
  /** Вариант отображения */
  variant?: "default" | "compact";
}
```

**Визуал:**
- Карточка с иконкой кавычек
- Имя + дата сверху
- Текст (с ограничением строк + «Читать полностью»)
- Звёзды рейтинга

---

### ArticleCard

Карточка статьи/новости.

```tsx
interface ArticleCardProps {
  /** Заголовок */
  title: string;
  /** Дата публикации */
  date: string;
  /** Краткое описание */
  excerpt: string;
  /** URL обложки */
  coverUrl: string;
  /** Slug для ссылки */
  slug: string;
}
```

---

### PromoCard

Карточка акции.

```tsx
interface PromoCardProps {
  /** Заголовок акции */
  title: string;
  /** Описание */
  description: string;
  /** Дата окончания (опционально) */
  expiresAt?: string;
  /** Иконка/иллюстрация */
  icon?: React.ReactNode;
  /** Ссылка */
  href?: string;
}
```

---

### BranchCard

Карточка филиала клиники.

```tsx
interface BranchCardProps {
  /** Город */
  city: string;
  /** Адрес */
  address: string;
  /** Телефоны (массив) */
  phones: string[];
  /** Email */
  email: string;
  /** График работы */
  schedule: {
    weekdays: string;  // "Пн-Сб: 9:00-20:00"
    weekend?: string;  // "Вс: Выходной"
  };
  /** Координаты для карты */
  coordinates?: {
    lat: number;
    lng: number;
  };
  /** Активный филиал (для подсветки) */
  isActive?: boolean;
  /** Обработчик выбора филиала */
  onSelect?: () => void;
}
```

---

### PriceTable

Таблица/аккордеон прайс-листа.

```tsx
interface PriceTableProps {
  /** Категории цен */
  categories: PriceCategory[];
}

interface PriceCategory {
  /** Название категории */
  name: string;
  /** Позиции */
  items: PriceItem[];
}

interface PriceItem {
  /** Код услуги */
  code: string;
  /** Название */
  name: string;
  /** Цена (строка для форматирования) */
  price: string;
}
```

---

### MapWidget

Интерактивная карта с маркерами филиалов.

```tsx
interface MapWidgetProps {
  /** Филиалы для отображения */
  branches: BranchCardProps[];
  /** Активный филиал (центрирование карты) */
  activeBranchIndex?: number;
  /** Высота контейнера карты */
  height?: string;
  /** API-ключ Яндекс Карт */
  apiKey: string;
}
```

**Реализация:**
- Использует `@yandex/ymaps3` (Yandex Maps API v3)
- Ленивая загрузка через `next/dynamic` (`ssr: false`)
- Маркеры с кастомной иконкой брендового цвета
- Balloon с адресом, телефоном, графиком при клике
- Переключение филиалов через `<BranchCard>` — карта центрируется на выбранном

---

### BookingForm

Форма онлайн-записи.

```tsx
interface BookingFormProps {
  /** Предвыбранная услуга (опционально) */
  preselectedService?: string;
  /** Предвыбранный врач (опционально) */
  preselectedDoctor?: string;
  /** Предвыбранный филиал (опционально) */
  preselectedBranch?: string;
  /** Вариант отображения */
  variant?: "inline" | "modal" | "page";
}
```

**Поля формы:**
1. Имя (обязательно)
2. Телефон (обязательно, маска `+7 (___) ___-__-__`)
3. Услуга (select, опционально)
4. Врач (select, опционально)
5. Филиал (select, опционально)
6. Комментарий (textarea, опционально)

**Валидация:**
- Клиентская: react-hook-form + zod
- Серверная: API Route `/api/booking`

---

### ContactForm

Форма обратной связи (на странице контактов).

```tsx
interface ContactFormProps {
  /** Дополнительные классы */
  className?: string;
}
```

**Поля:**
1. Имя (обязательно)
2. Телефон (обязательно)
3. Сообщение (textarea, обязательно)

---

## Секции главной страницы

### HeroSection

```tsx
interface HeroSectionProps {
  /** Заголовок */
  title?: string;       // default: "Дом Стоматологии"
  /** Подзаголовок */
  subtitle?: string;    // default: "Запишись на бесплатную консультацию"
  /** Фоновое изображение/видео */
  backgroundMedia?: {
    type: "image" | "video";
    src: string;
  };
}
```

**Фон:** Parallax-эффект через `useScroll` + `useTransform` из Framer Motion.

---

### WhyChooseUs

```tsx
interface WhyChooseUsProps {
  /** Не принимает пропсов — данные захардкожены */
}
```

**Данные:**
```ts
const advantages = [
  {
    icon: <InnovationIcon />,
    title: "Инновационные материалы",
    description: "Используем последние разработки в сфере европейской стоматологии",
  },
  {
    icon: <EquipmentIcon />,
    title: "Современное оборудование",
    description: "Оказываем стоматологические услуги максимально безопасно и качественно",
  },
  {
    icon: <DoctorsIcon />,
    title: "Профессиональные врачи",
    description: "Добрые и внимательные стоматологи помогут победить ваши страхи",
  },
];
```

---

### DirectorMessage

```tsx
interface DirectorMessageProps {
  /** Не принимает пропсов */
}
```

**Данные:** Фото + текст обращения Локтева А.А. (перенести со старого сайта, адаптировать).

---

### KidsHighlight

```tsx
interface KidsHighlightProps {
  /** Не принимает пропсов */
}
```

**Визуал:** Branded-секция с детским дизайном, выделенная цветом/иллюстрациями. CTA → `/services/detskaya-stomatologiya`.

---

### BookingCTA

```tsx
interface BookingCTAProps {
  /** Заголовок */
  title?: string;
  /** Подзаголовок */
  subtitle?: string;
}
```

**Визуал:** Акцентный фон (градиент или брендовый цвет), крупная кнопка, возможно встроенная мини-форма.

---

## Данные (Data Layer)

### Файлы данных

```
src/data/
├── services.ts         # Категории и подуслуги
├── doctors.ts          # Список врачей
├── prices.ts           # Прайс-лист (категории + позиции)
├── reviews.ts          # Отзывы
├── promotions.ts       # Акции
├── contacts.ts         # Филиалы, телефоны, email
├── technologies.ts     # Технологии оборудования
└── navigation.ts       # Навигационные пункты
```

### Типы данных

```ts
// src/data/types.ts

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;          // Название иконки
  subServices: SubService[];
  image?: string;
}

export interface SubService {
  slug: string;
  title: string;
  description: string;
  priceRange?: string;
}

export interface Doctor {
  slug: string;
  name: string;
  specialization: string;
  experience: number;    // Стаж в годах
  photo: string;
  bio?: string;
  directions?: string[];
  category: "therapist" | "surgeon" | "orthodontist" | "orthopedist" | "pediatric" | "technician" | "nurse" | "admin";
}

export interface PriceCategory {
  name: string;
  items: PriceItem[];
}

export interface PriceItem {
  code: string;
  name: string;
  price: number;         // Цена в рублях
}

export interface Review {
  authorName: string;
  date: string;          // ISO date
  text: string;
  rating?: number;
}

export interface Branch {
  id: string;
  city: string;
  address: string;
  phones: string[];
  email: string;
  schedule: {
    weekdays: string;
    weekend?: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Promotion {
  title: string;
  description: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface Technology {
  title: string;
  description: string;
  image?: string;
  slug: string;
}
```

---

## Иконки

Рекомендуется использовать **Lucide React** или кастомные SVG-иконки.

```bash
npm install lucide-react
```

**Пример использования:**
```tsx
import { Phone, Mail, MapPin, Clock, Star, ChevronDown } from "lucide-react";
```

Для брендовых иконок (CEREC, оборудование) — кастомные SVG в `src/components/icons/`.
