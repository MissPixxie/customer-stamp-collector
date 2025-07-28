"use client";

import { useSelectedMember } from "../hooks/useSelectedMember";
import { useModal } from "../modalContext";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";

export function MemberInFocus() {
  const { selectedMember } = useSelectedMember();
  const { openModal } = useModal();
  const { selectedStampCard, setSelectedStampCardId, isStampCardLoading } =
    useSelectedStampCard();

  if (selectedMember === null) return null;

  if (isStampCardLoading) {
    return <div>Laddar stämpelkort...</div>;
  }
  return (
    <div>
      <div className="flex grow flex-col rounded-2xl bg-amber-500 pt-5 pr-5 pb-5 pl-5">
        <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25">
          <div className="flex grow flex-row flex-wrap justify-between bg-green-300">
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
            <button
              className="transform self-end rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-600 px-3 py-1 text-black shadow-lg transition-transform duration-200 ease-in-out hover:scale-95"
              onClick={() => openModal("createStamp", selectedMember)}
            >
              <h4 className="text-4xl">+</h4>
            </button>
          </div>
        </div>
        <h4 className="mt-4 text-lg font-semibold">Stämpelkort:</h4>
        {selectedMember.stampCards.length > 0 ? (
          <ul className="cursor-pointer">
            {selectedMember.stampCards.map((stampcard) => {
              const totalStamps = 7;
              const filled = stampcard.stamps.length;
              const empty = totalStamps - filled;

              const typeTranslation = {
                Dog: "Hund",
                Cat: "Katt",
              };

              return (
                <div
                  key={stampcard.id}
                  onClick={() => {
                    setSelectedStampCardId(stampcard.id);
                    console.log(selectedStampCard);
                    openModal("stampInFocus", selectedMember, stampcard.id);
                  }}
                  className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25"
                >
                  <div className="flex w-full justify-between text-white">
                    <p>Stämpelkort: {stampcard.id}</p>
                    <p>{typeTranslation[stampcard.type] || stampcard.type}</p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    {stampcard.stamps.map((stamp) => (
                      <div
                        key={stamp.id}
                        title={`Namn: ${stamp.brand}, Pris: ${stamp.price}`}
                        className="h-9 w-9 rounded-full border border-white bg-yellow-300 shadow"
                      />
                    ))}

                    {[...Array(empty).keys()].map((idx) => (
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
