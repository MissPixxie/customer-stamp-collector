"use client";
import { useState } from "react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import type { StampCardWithStamps } from "stampCollector/server/api/routers/stampCard";
import { useModal } from "../modalContext";

export function MemberInFocus() {
  const { selectedMember, isLoading } = useSelectedMember();
  const { activeModal, closeModal, openModal } = useModal();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  if (selectedMember !== null) {
    return (
      <div>
        <div className="flex justify-between">
          <h1 className="text-center text-lg font-bold text-white dark:text-black">
            Medlem i fokus
          </h1>
          <button
            className="max-w-50 self-end rounded-2xl bg-green-400/80 px-4 py-3 text-sm font-normal text-white transition hover:bg-green-900 dark:text-black"
            onClick={() => openModal("createStamp", selectedMember)}
          >
            Nytt stämpelkort
          </button>
        </div>
        <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25">
          <div className="flex grow flex-row flex-wrap justify-between">
            <p className="truncat">Medlemsnummer: {selectedMember.membersNr}</p>
            <p>
              <strong>Skapad: </strong>
              {new Date(selectedMember.createdAt).toLocaleDateString()}
            </p>
            {selectedMember.name && (
              <div className="w-full">
                <p>{selectedMember.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex grow flex-col">
          <h4 className="mt-4 text-lg font-semibold">Stämpelkort:</h4>
          {selectedMember.stampCards.length > 0 ? (
            <ul className="cursor-pointer">
              {selectedMember.stampCards.map((stampcard) => {
                const totalStamps = 7;
                const filled = stampcard.stamps.length;
                const empty = totalStamps - filled;

                return (
                  <div
                    key={stampcard.id}
                    onClick={() =>
                      openModal("stampInFocus", selectedMember, stampcard.id)
                    }
                    className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25"
                  >
                    <li className="w-full font-bold text-white">
                      Stämpelkort ID: {stampcard.id}
                    </li>

                    <div className="mt-2 flex gap-3">
                      {stampcard.stamps.map((stamp) => (
                        <div
                          key={stamp.id}
                          title={`Namn: ${stamp.name}, Pris: ${stamp.price}`}
                          className="h-9 w-9 rounded-full border border-white bg-yellow-300 shadow"
                        />
                      ))}

                      {[...Array(empty)].map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="h-9 w-9 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>Inga stämpelkort hittades..</p>
          )}
        </div>
      </div>
    );
  }
}
