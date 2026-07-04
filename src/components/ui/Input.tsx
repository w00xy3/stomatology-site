interface InputProps {
  name: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  label,
  error,
  required = false,
  value,
  onChange,
  className = "",
}: InputProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border
    bg-surface text-text-primary placeholder-text-muted
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60 focus:bg-white
    ${error ? "border-error focus:ring-error/20 focus:border-error hover:border-error/60" : "border-border hover:border-primary/40"}
    ${className}
  `;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={4}
          className={baseClasses + " resize-none"}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={baseClasses}
        />
      )}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
