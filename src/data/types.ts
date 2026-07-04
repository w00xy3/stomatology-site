// ========================================
// Типы данных для сайта «Дом Стоматологии»
// ========================================

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
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
  experience?: number;
  photo: string;
  bio?: string;
  directions?: string[];
  category:
    | "therapist"
    | "surgeon"
    | "orthodontist"
    | "orthopedist"
    | "pediatric"
    | "technician"
    | "nurse"
    | "admin";
}

export interface PriceCategory {
  name: string;
  items: PriceItem[];
}

export interface PriceItem {
  code: string;
  name: string;
  price: number;
}

export interface Review {
  authorName: string;
  date: string;
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
  id: string;
  title: string;
  description: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface Technology {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
