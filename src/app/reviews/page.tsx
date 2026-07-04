"use client";

import { useState } from "react";
import { reviews } from "@/data/reviews";
import ReviewCard from "@/components/shared/ReviewCard";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import Button from "@/components/ui/Button";
import BookingCTA from "@/components/sections/BookingCTA";

const REVIEWS_PER_PAGE = 12;

export default function ReviewsPage() {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Отзывы о клинике
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {reviews.length} отзывов от наших пациентов. Средний рейтинг — 5.0
          </p>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <StaggerItem key={`${review.authorName}-${review.date}-${review.text.slice(0, 20)}`}>
                <ReviewCard
                  authorName={review.authorName}
                  date={review.date}
                  text={review.text}
                  rating={review.rating}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          {hasMore && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
              >
                Загрузить ещё
              </Button>
            </div>
          )}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
