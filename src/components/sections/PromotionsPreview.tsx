"use client";

import { getActivePromotions } from "@/data/promotions";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import PromoCard from "@/components/shared/PromoCard";
import Button from "@/components/ui/Button";

export default function PromotionsPreview() {
  const activePromotions = getActivePromotions();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Акции и специальные предложения"
          subtitle="Выгодные условия для наших пациентов"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePromotions.map((promo) => (
            <StaggerItem key={promo.id}>
              <PromoCard
                title={promo.title}
                description={promo.description}
                expiresAt={promo.expiresAt}
                href="/promotions"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="text-center mt-10">
          <Button href="/promotions" variant="outline" size="md">
            Все акции
          </Button>
        </div>
      </div>
    </section>
  );
}
