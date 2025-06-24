"use client";
import { useState } from "react";
import { useSelectedMember, type Member } from "../memberContextProvider";
import { CustomerCard } from "./customerCard";
import { StampCardInFocus } from "./stampCardInFocus";
import { CreateStampCard } from "./createStampCard";
import type { StampCard } from "@prisma/client";

export function MemberInFocus() {
  const { selectedMember } = useSelectedMember();
  const [selectedCard, setSelectedCard] = useState<StampCard | null>(null);

  console.log("memberinfocus", selectedMember?.stampCards);
  return (
    <div>
      <div>
        <h1 className="text-center text-lg font-bold text-white dark:text-black">
          Medlem i fokus
        </h1>
        {selectedMember ? (
          <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25">
            <div className="flex grow flex-row justify-between">
              <p className="truncat">
                Medlemsnummer: {selectedMember.medlemsNr}
              </p>
              <p>
                <strong>Skapad: </strong>
                {new Date(selectedMember.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex grow flex-col">
              <h4 className="mt-4 text-lg font-semibold">Stämpelkort:</h4>
              {selectedMember.stampCards!.length > 0 ? (
                <ul className="list-disc pl-5">
                  {selectedMember.stampCards!.map((stampcard) => (
                    <li
                      className="cursor-pointer hover:bg-black/10"
                      key={`stampcard-${stampcard.id}`}
                      onClick={() => {
                        setSelectedCard(stampcard);
                      }}
                    >
                      Stämpelkort ID: {stampcard.id}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Inga stämpelkort hittades..</p>
              )}
              <CreateStampCard customerId={selectedMember.id} />
            </div>
          </div>
        ) : (
          <h1 className="text-center text-lg font-bold text-white dark:text-black"></h1>
        )}
      </div>
      <div>
        {selectedCard ? (
          <StampCardInFocus
            key={`stampcard-${selectedCard.id}`}
            stampCard={selectedCard}
          />
        ) : (
          <p>Inga stämpelkort hittades</p>
        )}
      </div>
    </div>
  );
}
