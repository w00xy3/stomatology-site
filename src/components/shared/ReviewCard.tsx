import { Star, Quote } from "@/components/icons";

interface ReviewCardProps {
  authorName: string;
  date: string;
  text: string;
  rating?: number;
  variant?: "default" | "compact";
}

export default function ReviewCard({
  authorName,
  date,
  text,
  rating = 5,
  variant = "default",
}: ReviewCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col border border-border/30">
      <div className="flex items-start justify-between mb-3">
        <Quote className="w-8 h-8 text-primary/15 shrink-0" />
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? "text-accent fill-accent" : "text-border"
              }`}
            />
          ))}
        </div>
      </div>
      <p className={`text-text-secondary leading-relaxed mb-4 flex-1 ${variant === "compact" ? "text-sm line-clamp-4" : "text-sm"}`}>
        {text}
      </p>
      <div className="pt-3 border-t border-border/30">
        <p className="font-semibold text-text-primary text-sm">{authorName}</p>
        <p className="text-xs text-text-muted">{formattedDate}</p>
      </div>
    </div>
  );
}
