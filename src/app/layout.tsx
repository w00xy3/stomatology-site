import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/shared/ChatWidget";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["cyrillic-ext", "latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Дом Стоматологии — стоматология в Ставрополе и Москве",
    template: "%s | Дом Стоматологии",
  },
  description:
    "Сеть стоматологических клиник в Ставрополе и Москве. Лечение зубов, имплантация, протезирование, ортодонтия. Бесплатная консультация.",
  keywords: [
    "стоматология",
    "стоматолог",
    "Ставрополь",
    "Москва",
    "лечение зубов",
    "имплантация",
    "протезирование",
    "Дом Стоматологии",
  ],
  openGraph: {
    title: "Дом Стоматологии",
    description: "Сеть стоматологических клиник в Ставрополе и Москве",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <ChatWidget />
      </body>
    </html>
  );
}
