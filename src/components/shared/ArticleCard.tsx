import Link from "next/link";
import { Calendar, ArrowUp } from "@/components/icons";

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt: string;
  coverUrl: string;
  slug: string;
}

export default function ArticleCard({
  title,
  date,
  excerpt,
  coverUrl,
  slug,
}: ArticleCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/articles/${slug}`} className="block group h-full">
      <div className="rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
          <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">
            Читать далее
            <ArrowUp className="w-4 h-4 rotate-45" />
          </span>
        </div>
      </div>
    </Link>
  );
}
