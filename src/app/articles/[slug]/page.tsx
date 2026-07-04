import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug, articles } from "@/data/articles";
import { ChevronRight, Calendar } from "@/components/icons";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Статья не найдена</h1>
          <Button href="/articles" variant="primary">К списку статей</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/articles" className="hover:text-white transition-colors">Статьи</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{article.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="container-custom -mt-8 relative z-10">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-elevated">
          <Image
            src={article.coverUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary">
            {article.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("•")) {
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j} className="text-text-secondary">
                        {item.replace("• ", "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-text-secondary leading-relaxed mb-4">{paragraph}</p>;
            })}
          </article>

          <div className="mt-12 pt-8 border-t border-border">
            <Button href="/articles" variant="outline" size="md">
              ← Все статьи
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
