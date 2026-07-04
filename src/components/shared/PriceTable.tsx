"use client";

import { formatPrice } from "@/data/prices";
import type { PriceCategory } from "@/data/types";
import Accordion from "@/components/ui/Accordion";

interface PriceTableProps {
  categories: PriceCategory[];
}

export default function PriceTable({ categories }: PriceTableProps) {
  const accordionItems = categories.map((category) => ({
    title: category.name,
    badge: `${category.items.length} поз.`,
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-text-muted text-left">
              <th className="pb-2 font-medium w-32">Код</th>
              <th className="pb-2 font-medium">Наименование</th>
              <th className="pb-2 font-medium text-right w-28">Цена</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item) => (
              <tr
                key={item.code}
                className="border-b border-border/50 last:border-0 hover:bg-background-alt/50 transition-colors"
              >
                <td className="py-2.5 text-text-muted text-xs font-mono">
                  {item.code}
                </td>
                <td className="py-2.5 text-text-primary">{item.name}</td>
                <td className="py-2.5 text-right font-medium text-text-primary whitespace-nowrap">
                  {formatPrice(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  }));

  return <Accordion items={accordionItems} allowMultiple />;
}
