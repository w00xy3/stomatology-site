import { MapPin, Phone, Clock, Mail } from "@/components/icons";
import type { Branch } from "@/data/types";

interface BranchCardProps extends Branch {
  isActive?: boolean;
  onSelect?: () => void;
}

export default function BranchCard({
  city,
  address,
  phones,
  email,
  schedule,
  isActive = false,
  onSelect,
}: BranchCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-primary/5 ring-2 ring-primary shadow-card"
          : "bg-white shadow-card hover:shadow-card-hover"
      }`}
    >
      <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary shrink-0" />
        {city}, {address}
      </h3>
      <div className="space-y-2 text-sm text-text-secondary">
        {phones.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            {phone}
          </a>
        ))}
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{schedule.weekdays}</span>
        </div>
        {schedule.weekend && (
          <div className="flex items-center gap-2 ml-[1.375rem]">
            <span>{schedule.weekend}</span>
          </div>
        )}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          {email}
        </a>
      </div>
    </div>
  );
}
