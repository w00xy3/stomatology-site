import { priceCategories, getTotalPriceItems } from "@/data/prices";
import PriceTable from "@/components/shared/PriceTable";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Phone } from "@/components/icons";
import { branches } from "@/data/contacts";

export const metadata = {
  title: "Прайс-лист",
  description: "Прейскурант на медицинские услуги стоматологии «Дом Стоматологии». Консультация бесплатно.",
};

export default function PricePage() {
  const totalItems = getTotalPriceItems();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Прейскурант на медицинские услуги
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Консультация — бесплатно
          </p>
          <p className="text-white/60 text-sm">
            {totalItems} позиций в {priceCategories.length} категориях
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {branches.map((b) => (
              <a
                key={b.id}
                href={`tel:${b.phones[0].replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {b.city}: {b.phones[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <PriceTable categories={priceCategories} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
