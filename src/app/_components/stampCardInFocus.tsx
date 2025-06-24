"use client";
import type { StampCard } from "@prisma/client";
import { useSelectedMember, type Member } from "../memberContextProvider";
import { CustomerCard } from "./customerCard";
import { CreateStamp } from "./createStamp";
import { StampDetails } from "./stampDetails";

export function StampCardInFocus({ stampCard }: { stampCard: StampCard }) {
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
          {stampCard.stamps!.length > 0 ? (
            <ul className="cursor-pointer list-disc pl-5">
              {stampCard.stamps!.map((stamps) => (
                <>
                  <StampDetails stampId={stamps} />
                </>
              ))}
            </ul>
          ) : (
            <p>Inga stämplar hittades..</p>
          )}
          <h1 className="text-center text-lg font-bold text-white dark:text-black">
            {new Date(stampCard.createdAt).toLocaleString()}
          </h1>
          <CreateStamp stampCardId={stampCard.id} />
        </div>
      ) : (
        <h1 className="text-center text-lg font-bold text-white dark:text-black"></h1>
      )}
    </div>
  );
}
