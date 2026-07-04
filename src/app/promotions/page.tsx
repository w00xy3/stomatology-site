import { promotions } from "@/data/promotions";
import PromoCard from "@/components/shared/PromoCard";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import BookingCTA from "@/components/sections/BookingCTA";

export default function PromotionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Акции и специальные предложения
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Выгодные условия для наших пациентов
          </p>
        </div>
      </section>

      {/* Promotions */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <StaggerItem key={promo.id}>
                <PromoCard
                  title={promo.title}
                  description={promo.description}
                  expiresAt={promo.expiresAt}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
