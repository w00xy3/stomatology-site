import ScrollReveal from "./ScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  size = "md",
  className = "",
}: SectionHeaderProps) {
  const titleClasses =
    size === "lg"
      ? "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
      : "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight";

  return (
    <ScrollReveal className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}>
      <h2
        className={`${titleClasses} text-text-primary`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-text-secondary ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
