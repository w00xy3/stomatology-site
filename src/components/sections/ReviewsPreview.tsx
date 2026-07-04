"use client";

import { getPreviewReviews } from "@/data/reviews";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import ReviewCard from "@/components/shared/ReviewCard";
import Button from "@/components/ui/Button";

export default function ReviewsPreview() {
  const previewReviews = getPreviewReviews();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          title="Отзывы наших пациентов"
          subtitle="Что говорят о нас те, кто доверяет нам свою улыбку"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewReviews.map((review, i) => (
            <StaggerItem key={i}>
              <ReviewCard
                authorName={review.authorName}
                date={review.date}
                text={review.text}
                rating={review.rating}
                variant="compact"
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="text-center mt-10">
          <Button href="/reviews" variant="outline" size="md">
            Все отзывы
          </Button>
        </div>
      </div>
    </section>
  );
}
