import type { Promotion } from "./types";

export const promotions: Promotion[] = [
  {
    id: "family-discount",
    title: "Скидка 10% для семьи и пенсионеров",
    description:
      "Получите скидку 10% на все стоматологические услуги для членов одной семьи и пенсионеров. Скидка предоставляется при предъявлении соответствующих документов.",
    isActive: true,
  },
  {
    id: "installment",
    title: "Услуги в рассрочку",
    description:
      "Воспользуйтесь возможностью оплатить лечение в рассрочку. Без переплат и скрытых комиссий. Подробности у администраторов клиники.",
    isActive: true,
  },
  {
    id: "referral",
    title: "Порекомендуй близкому — получи 1000 ₽",
    description:
      "Рекомендуйте нашу клинику друзьям и близким. За каждого нового пациента, который упомянет вас при записи, вы получите 1000 ₽ на счёт или депозит.",
    expiresAt: "2026-07-31",
    isActive: true,
  },
];

/**
 * Получить активные акции
 */
export function getActivePromotions(): Promotion[] {
  return promotions.filter((p) => p.isActive);
}
