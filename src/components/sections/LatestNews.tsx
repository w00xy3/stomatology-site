"use client";

import { articles } from "@/data/articles";
import SectionHeader from "@/components/ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import ArticleCard from "@/components/shared/ArticleCard";
import Button from "@/components/ui/Button";

export default function LatestNews() {
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="section-padding bg-background-alt">
      <div className="container-custom">
        <SectionHeader
          title="Последние новости"
          subtitle="Будьте в курсе событий нашей клиники"
        />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <ArticleCard
                title={article.title}
                date={article.date}
                excerpt={article.excerpt}
                coverUrl={article.coverUrl}
                slug={article.slug}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="text-center mt-10">
          <Button href="/articles" variant="outline" size="md">
            Все новости
          </Button>
        </div>
      </div>
    </section>
  );
}
