import { articles } from "@/data/articles";
import ArticleCard from "@/components/shared/ArticleCard";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";

export const metadata = {
  title: "Статьи и новости",
  description: "Полезные статьи о стоматологии и новости клиники «Дом Стоматологии»",
};

export default function ArticlesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Статьи и новости
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Полезные материалы о стоматологии и новости нашей клиники
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
        </div>
      </section>
    </>
  );
}
