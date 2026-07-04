import Link from "next/link";
import { footerNavItems } from "@/data/navigation";
import { branches, primaryEmail } from "@/data/contacts";
import { Phone, Mail, MapPin, Clock } from "@/components/icons";
import Logo from "@/components/icons/Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo variant="light" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Сеть стоматологических клиник в Ставрополе и Москве. Более 25 лет
              заботимся о вашей улыбке.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch.id} className="text-sm">
                  <div className="flex items-start gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                    <span className="text-white/80">
                      {branch.city}, {branch.address}
                    </span>
                  </div>
                  {branch.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-2 ml-6 text-white/60 hover:text-white transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      {phone}
                    </a>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule & Email */}
          <div>
            <h4 className="font-semibold text-white mb-4">Режим работы</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div className="text-white/60">
                  <p>Ставрополь: Пн–Сб 9:00–20:00</p>
                  <p>Москва: Пн–Сб 9:00–21:00, Вс 10:00–21:00</p>
                </div>
              </div>
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary-light" />
                {primaryEmail}
              </a>
            </div>
          </div>
        </div>          {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} «Дом Стоматологии». Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
