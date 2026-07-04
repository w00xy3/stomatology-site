import Link from "next/link";
import { Calendar, ArrowUp } from "@/components/icons";

interface PromoCardProps {
  title: string;
  description: string;
  expiresAt?: string;
  href?: string;
}

export default function PromoCard({
  title,
  description,
  expiresAt,
  href,
}: PromoCardProps) {
  const content = (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white h-full flex flex-col">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm leading-relaxed flex-1">{description}</p>
      {expiresAt && (
        <div className="flex items-center gap-2 mt-4 text-white/60 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            до{" "}
            {new Date(expiresAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      )}
      {href && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-4">
          Подробнее
          <ArrowUp className="w-4 h-4 rotate-45" />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
