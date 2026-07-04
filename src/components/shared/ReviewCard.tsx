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
    <div className="bg-white rounded-2xl p-6 shadow-card h-full flex flex-col">
      <Quote className="w-8 h-8 text-primary/20 mb-3 shrink-0" />
      <p className={`text-text-secondary leading-relaxed mb-4 flex-1 ${variant === "compact" ? "text-sm line-clamp-4" : "text-sm"}`}>
        {text}
      </p>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-accent fill-accent" : "text-border"
            }`}
          />
        ))}
      </div>
      <div>
        <p className="font-medium text-text-primary text-sm">{authorName}</p>
        <p className="text-xs text-text-muted">{formattedDate}</p>
      </div>
    </div>
  );
}
