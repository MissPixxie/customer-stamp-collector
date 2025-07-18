"use client";
import type { Stamp, StampCard } from "@prisma/client";
import { useSelectedMember, type Member } from "../memberContextProvider";
import { CustomerCard } from "./customerCard";
import { CreateStamp } from "./createStamp";
import { StampDetails } from "./stampDetails";

type StampCardProps = {
  stampCard: {
    id: number;
    customerid: number;
    stamps: Stamp[];
    createdAt: Date;
  };
};

export function StampCardInFocus({ stampCard }: StampCardProps) {
  console.log("stampcardinfocus", stampCard);
  return (
    <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-pink-400 p-3 drop-shadow-xl/25">
      <h1 className="text-center text-lg font-bold text-white dark:text-black">
        Stämpelkort i fokus
      </h1>
      {stampCard ? (
        <div>
          <p className="truncat">StämpelkortNr: {stampCard.id}</p>
          {/* <CardDetails card={stampCard} /> */}
          <div>
            {stampCard ? (
              <div className="flex cursor-pointer list-disc flex-row justify-between bg-green-200 pl-5">
                {stampCard.stamps.map((stamp) => (
                  <>
                    <StampDetails key={stamp.id} stamp={stamp} />
                  </>
                ))}
              </div>
            ) : (
              <p>Inga stämplar hittades..</p>
            )}
          </div>
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
