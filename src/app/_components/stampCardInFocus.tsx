"use client";
import type { StampCard } from "@prisma/client";
import { useSelectedMember, type Member } from "../memberContextProvider";
import { CustomerCard } from "./customerCard";

export function StampCardInFocus({ stampCard }: { stampCard: StampCard }) {
  return (
    <div>
      <h1 className="text-center text-lg font-bold text-white dark:text-black">
        Stämpelkort i fokus
      </h1>
      {stampCard ? (
        <div>
          <h1 className="text-center text-lg font-bold text-white dark:text-black">
            {stampCard.id}
          </h1>
          <h1 className="text-center text-lg font-bold text-white dark:text-black">
            {new Date(stampCard.createdAt).toLocaleString()}
          </h1>
        </div>
      ) : (
        <h1 className="text-center text-lg font-bold text-white dark:text-black"></h1>
      )}
    </div>
  );
}
