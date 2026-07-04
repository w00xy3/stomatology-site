import type { Branch } from "./types";

export const branches: Branch[] = [
  {
    id: "stavropol-ordzhonikidze",
    city: "Ставрополь",
    address: "ул. Орджоникидзе, 1",
    phones: ["+7 (865) 225-72-95", "+7 (865) 294-24-64"],
    email: "dom_stom@mail.ru",
    schedule: {
      weekdays: "Пн–Сб: 9:00–20:00",
      weekend: "Вс: Выходной",
    },
    // TODO: Уточнить координаты через геокодирование по адресу
    coordinates: {
      lat: 45.0433,
      lng: 41.9682,
    },
  },
  {
    id: "stavropol-serova",
    city: "Ставрополь",
    address: "ул. Серова, 470/2",
    phones: ["+7 (865) 225-72-80", "+7 (865) 228-82-02"],
    email: "dom_stom@mail.ru",
    schedule: {
      weekdays: "Пн–Сб: 9:00–20:00",
      weekend: "Вс: Выходной",
    },
    // TODO: Уточнить координаты через геокодирование по адресу
    coordinates: {
      lat: 45.0547,
      lng: 41.973,
    },
  },
  {
    id: "moscow-lazareva",
    city: "Москва",
    address: "ул. Адмирала Лазарева, 52-3",
    phones: ["+7 (495) 714-05-00"],
    email: "dom-stom@mail.ru",
    schedule: {
      weekdays: "Пн–Сб: 9:00–21:00",
      weekend: "Вс: 10:00–21:00",
    },
    // TODO: Уточнить координаты через геокодирование по адресу
    coordinates: {
      lat: 55.5483,
      lng: 37.5421,
    },
  },
];

/**
 * Получить филиал по id
 */
export function getBranchById(id: string): Branch | undefined {
  return branches.find((b) => b.id === id);
}

/**
 * Получить только ставропольские филиалы
 */
export function getStavropolBranches(): Branch[] {
  return branches.filter((b) => b.city === "Ставрополь");
}

/**
 * Основной телефон для связи
 */
export const primaryPhone = "+7 (865) 225-72-95";

/**
 * Email для связи
 */
export const primaryEmail = "dom_stom@mail.ru";

/**
 * Ссылка на мессенджер MAX
 */
export const messengerLink = "https://max.ru";
