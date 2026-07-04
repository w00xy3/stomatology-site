import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    slug: "loktev-aleksandr-alekseevich",
    name: "Локтев Александр Алексеевич",
    specialization: "Врач стоматолог-ортопед",
    experience: 38,
    photo: "/images/doctors/loktev-aa.webp",
    bio: "Директор клиники «Дом стоматологии». Специалист по протезированию полости рта любой сложности и протезированию на имплантах. Опыт работы более 38 лет.",
    directions: ["Протезирование зубов", "Протезирование на имплантах", "Микропротезирование"],
    category: "orthopedist",
  },
  {
    slug: "lokteva-zhanna-borisovna",
    name: "Локтева Жанна Борисовна",
    specialization: "Врач стоматолог-терапевт, пародонтолог",
    experience: 38,
    photo: "/images/doctors/lokteva-zh.webp",
    bio: "Главный врач клиники. Специалист в области эндодонтии, лечения слизистой полости рта и микропротезирования. Опыт работы более 38 лет.",
    directions: ["Эндодонтия", "Пародонтология", "Микропротезирование"],
    category: "therapist",
  },
  {
    slug: "pikina-natalya-vladimirovna",
    name: "Пикина Наталья Владимировна",
    specialization: "Врач стоматолог-терапевт",
    experience: 25,
    photo: "/images/doctors/pikina-nv.webp",
    bio: "Специалист в области эндодонтии, лечения заболеваний слизистой полости рта, плазмолифтинга. Опыт работы 25 лет.",
    directions: ["Эндодонтия", "Лечение слизистой", "Плазмолифтинг"],
    category: "therapist",
  },
  {
    slug: "fil-olga-vyacheslavovna",
    name: "Филь Ольга Вячеславовна",
    specialization: "Врач стоматолог-терапевт, ортопед",
    experience: 16,
    photo: "/images/doctors/fil-ov.webp",
    bio: "Специалист в области терапевтической и ортопедической стоматологии. Опыт работы 16 лет.",
    directions: ["Терапевтическая стоматология", "Ортопедия"],
    category: "therapist",
  },
  {
    slug: "piskunova-natalya-sergeevna",
    name: "Пискунова Наталья Сергеевна",
    specialization: "Врач стоматолог-терапевт",
    experience: 14,
    photo: "/images/doctors/piskunova-ns.webp",
    bio: "Специалист в области терапевтической стоматологии. Опыт работы 14 лет.",
    directions: ["Терапевтическая стоматология", "Лечение кариеса", "Эндодонтия"],
    category: "therapist",
  },
  {
    slug: "sharipov-dzhalil-sarvarovich",
    name: "Шарипов Джалил Сарварович",
    specialization: "Врач стоматолог-хирург, имплантолог",
    experience: 11,
    photo: "/images/doctors/sharipov-ds.webp",
    bio: "Специалист в области хирургической стоматологии и имплантологии. Опыт работы 11 лет.",
    directions: ["Хирургическая стоматология", "Имплантация", "Удаление зубов"],
    category: "surgeon",
  },
  {
    slug: "gostyuk-evgenij-ivanovich",
    name: "Гостюк Евгений Иванович",
    specialization: "Врач стоматолог-хирург",
    experience: 10,
    photo: "/images/doctors/gostyuk-ei.webp",
    bio: "Специалист в области хирургической стоматологии. Опыт работы 10 лет.",
    directions: ["Хирургическая стоматология", "Удаление зубов"],
    category: "surgeon",
  },
  {
    slug: "koberidze-lola-konstantinovna",
    name: "Коберидзе Лола Константиновна",
    specialization: "Врач стоматолог-ортодонт",
    experience: 11,
    photo: "/images/doctors/koberidze-lk.webp",
    bio: "Специалист в области ортодонтии. Установка брекет-систем, элайнеров, ортодонтических пластинок. Опыт работы 11 лет.",
    directions: ["Брекеты Damon", "Элайнеры", "Исправление прикуса"],
    category: "orthodontist",
  },
  {
    slug: "kalashnikov-ruslan-sergeevich",
    name: "Калашников Руслан Сергеевич",
    specialization: "Врач стоматолог-терапевт, эндодонтист",
    experience: 7,
    photo: "/images/doctors/kalashnikov-rs.webp",
    bio: "Специалист в области эндодонтии и терапевтической стоматологии. Опыт работы 7 лет.",
    directions: ["Эндодонтия", "Лечение каналов", "Терапевтическая стоматология"],
    category: "therapist",
  },
  {
    slug: "ortobaeva-maryam-salimovna",
    name: "Ортобаева Мариям Салимовна",
    specialization: "Детский стоматолог",
    experience: 5,
    photo: "/images/doctors/ortobaeva-ms.webp",
    bio: "Специалист в области детской стоматологии. Работает с детьми любого возраста, включая лечение под седацией закисью азота. Опыт работы 5 лет.",
    directions: ["Детская стоматология", "Лечение под седацией", "Детская гигиена"],
    category: "pediatric",
  },
  {
    slug: "obryashchenko-vladimir-andreevich",
    name: "Обрященко Владимир Андреевич",
    specialization: "Врач стоматолог-терапевт, ортопед",
    experience: 6,
    photo: "/images/doctors/obryashchenko-va.webp",
    bio: "Специалист в области терапевтической и ортопедической стоматологии. Опыт работы 6 лет.",
    directions: ["Терапевтическая стоматология", "Ортопедия", "Протезирование"],
    category: "therapist",
  },
  {
    slug: "timoshenko-elizaveta-viktorovna",
    name: "Тимошенко Елизавета Викторовна",
    specialization: "Детский стоматолог, врач стоматолог-терапевт",
    experience: 2,
    photo: "/images/doctors/timoshenko-ev.webp",
    bio: "Специалист в области детской и терапевтической стоматологии. Опыт работы 2 года.",
    directions: ["Детская стоматология", "Терапевтическая стоматология"],
    category: "pediatric",
  },
  {
    slug: "gvozdikova-oksana-igorevna",
    name: "Гвоздикова Оксана Игоревна",
    specialization: "Врач стоматолог общей практики",
    photo: "/images/doctors/gvozdikova-oi.webp",
    bio: "Врач стоматолог общей практики.",
    directions: ["Общая стоматология"],
    category: "therapist",
  },
  {
    slug: "popova-natalya-nikolaevna",
    name: "Попова Наталья Николаевна",
    specialization: "Медицинская сестра",
    photo: "/images/doctors/popova-nn.webp",
    category: "nurse",
  },
  {
    slug: "dimitrenko-natalya-aleksandrovna",
    name: "Димитренко Наталья Александровна",
    specialization: "Старшая медицинская сестра",
    photo: "/images/doctors/dimitrenko-na.webp",
    category: "nurse",
  },
  {
    slug: "porubaev-dmitrij-viktorovich",
    name: "Порубаев Дмитрий Викторович",
    specialization: "Зубной техник",
    photo: "/images/doctors/porubaev-dv.webp",
    bio: "Зубной техник. Изготовление зубных протезов, коронок, виниров.",
    directions: ["Зуботехническая лаборатория"],
    category: "technician",
  },
  {
    slug: "motovilov-ruslan-evgenevich",
    name: "Мотовилов Руслан Евгеньевич",
    specialization: "Зубной техник",
    photo: "/images/doctors/motovilov-re.webp",
    bio: "Зубной техник. Изготовление зубных протезов, коронок, виниров.",
    directions: ["Зуботехническая лаборатория"],
    category: "technician",
  },
  {
    slug: "minaskurt-nadezhda",
    name: "Минаскурт Надежда",
    specialization: "Администратор",
    photo: "/images/doctors/minaskurt-n.webp",
    category: "admin",
  },
  {
    slug: "verdyann-aksanna",
    name: "Вердян Аксанна",
    specialization: "Медицинская сестра",
    photo: "/images/doctors/verdyann-a.webp",
    category: "nurse",
  },
  {
    slug: "listova-anna-vladimirovna",
    name: "Листова Анна Владимировна",
    specialization: "Зубной техник",
    photo: "/images/doctors/listova-av.webp",
    bio: "Зубной техник. Изготовление зубных протезов, коронок, виниров.",
    directions: ["Зуботехническая лаборатория"],
    category: "technician",
  },
];

/**
 * Получить врача по slug
 */
export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

/**
 * Получить врачей по категории
 */
export function getDoctorsByCategory(
  category: Doctor["category"]
): Doctor[] {
  return doctors.filter((d) => d.category === category);
}

/**
 * Получить врачей для превью на главной (первые 4 ведущих)
 */
export function getPreviewDoctors(): Doctor[] {
  return doctors.filter((d) =>
    ["loktev-aleksandr-alekseevich", "lokteva-zhanna-borisovna", "pikina-natalya-vladimirovna", "fil-olga-vyacheslavovna"].includes(d.slug)
  );
}

/**
 * Получить только врачей-стоматологов (без медсестёр, техников, админов)
 */
export function getMainDoctors(): Doctor[] {
  return doctors.filter((d) =>
    !["nurse", "technician", "admin"].includes(d.category)
  );
}
