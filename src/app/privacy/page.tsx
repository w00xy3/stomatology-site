import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных пациентов клиники «Дом Стоматологии».",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Мы защищаем ваши персональные данные и уважаем ваше право на конфиденциальность
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="space-y-8 text-text-secondary leading-relaxed">
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  1. Общие положения
                </h2>
                <p>
                  Настоящая политика конфиденциальности описывает порядок сбора, хранения
                  и использования персональных данных пользователей сайта клиники
                  «Дом Стоматологии». Мы придаём большое значение защите ваших данных
                  и соблюдаем требования Федерального закона № 152-ФЗ «О персональных данных».
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  2. Какие данные мы собираем
                </h2>
                <p className="mb-2">
                  При использовании сайта и записи на приём мы можем собирать следующие данные:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Имя и фамилия</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Информацию о предпочитаемой услуге и враче</li>
                  <li>Комментарии и пожелания</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  3. Цели обработки данных
                </h2>
                <p className="mb-2">
                  Персональные данные используются исключительно для следующих целей:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Запись пациента на приём к врачу</li>
                  <li>Связь с пациентом для подтверждения записи</li>
                  <li>Информирование о результатах диагностики и лечения</li>
                  <li>Напоминания о предстоящих приёмах</li>
                  <li>Улучшение качества обслуживания</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  4. Хранение и защита данных
                </h2>
                <p>
                  Мы принимаем все необходимые организационные и технические меры для защиты
                  персональных данных от несанкционированного доступа, уничтожения, изменения
                  или распространения. Доступ к данным имеют только уполномоченные сотрудники
                  клиники, связанные обязательствами о неразглашении.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  5. Передача данных третьим лицам
                </h2>
                <p>
                  Мы не передаём персональные данные третьим лицам без вашего согласия,
                  за исключением случаев, предусмотренных законодательством Российской Федерации.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  6. Ваши права
                </h2>
                <p className="mb-2">Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Получить информацию о том, какие данные о вас хранятся</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления данных в случае прекращения обслуживания</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  7. Контакты
                </h2>
                <p>
                  По всем вопросам, связанным с обработкой персональных данных, вы можете
                  связаться с нами по телефону +7 (865) 225-72-95 или по электронной почте
                  dom_stom@mail.ru.
                </p>
              </div>

              <p className="text-sm text-text-muted pt-4 border-t border-border">
                Последнее обновление: {new Date().toLocaleDateString("ru-RU")}.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
