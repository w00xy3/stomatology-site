interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "light" ? "#FFFFFF" : "#3B2314";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#6B5B4E";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="18" cy="18" r="16" stroke={color} strokeWidth="1.2" />
        <line x1="18" y1="4" x2="18" y2="10" stroke={color} strokeWidth="1.2" />
        <line x1="15" y1="7" x2="21" y2="7" stroke={color} strokeWidth="1.2" />
        <path
          d="M14.5 14C14.5 13.1716 15.1716 12.5 16 12.5H20C20.8284 12.5 21.5 13.1716 21.5 14V17C21.5 18.5 20.5 19.5 20 20C19.5 20.5 19 22 19 23.5C19 24.5 18.5 25.5 18 26C17.5 25.5 17 24.5 17 23.5C17 22 16.5 20.5 16 20C15.5 19.5 14.5 18.5 14.5 17V14Z"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-serif font-bold text-base tracking-wide"
          style={{ color }}
        >
          ДОМ
        </span>
        <span
          className="font-serif text-[10px] tracking-[0.15em] uppercase"
          style={{ color: subColor }}
        >
          Стоматологии
        </span>
      </div>
    </div>
  );
}
