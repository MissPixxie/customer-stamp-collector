"use client";
import { useState } from "react";
import { useSelectedMember } from "../memberContextProvider";
import type { StampCardWithStamps } from "stampCollector/server/api/routers/stampCard";
import { useModal } from "../modalContext";

export function MemberInFocus() {
  const { selectedMember } = useSelectedMember();
  const { activeModal, closeModal, openModal } = useModal();
  const [selectedCard, setSelectedCard] = useState<StampCardWithStamps | null>(
    null,
  );

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
            <ul className="cursor-pointer list-disc pl-5">
              {selectedMember.stampCards.map((stampcard) => (
                <div className="m-2 flex max-w-lg transform flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25 transition-transform duration-200 ease-in-out hover:scale-105">
                  <li key={stampcard.id}>Stämpelkort ID: {stampcard.id}</li>
                </div>
              ))}
            </ul>
          ) : (
            <p>Inga stämpelkort hittades..</p>
          )}
        </div>
      </div>
    );
  }
}
