import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Дом Стоматологии"
        width={413}
        height={96}
        className={`h-10 w-auto lg:h-12 object-contain ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
        priority
      />
    </div>
  );
}
