"use client";

import { useSelectedMember } from "../hooks/useSelectedMember";
import { useModal } from "../modalContext";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";
import { DeleteStampCard } from "./deleteStampCard";

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
      <div className="ph-5 relative flex flex-col rounded-2xl bg-white pt-5 text-stone-200 md:w-90 lg:w-fit dark:bg-stone-800">
        <div className="m-2 flex flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25 lg:max-w-lg">
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
        <button
          className="absolute -top-3 -right-3 transform self-end rounded-full bg-gradient-to-r from-green-500 via-green-400 to-green-600 px-3 text-black shadow-lg transition-transform duration-200 ease-in-out hover:scale-95"
          onClick={() => openModal("createStamp", selectedMember)}
        >
          <h4 className="text-4xl">+</h4>
        </button>
        <h4 className="mt-4 text-lg font-semibold text-black md:ml-2 dark:text-stone-300">
          Stämpelkort:
        </h4>
        {selectedMember.stampCards.length > 0 ? (
          <ul className="cursor-pointer">
            {selectedMember.stampCards.map((stampcard) => {
              const totalStamps = 7;
              const filled = stampcard.stamps.length;
              const empty = totalStamps - filled;

              const typeTranslation = {
                Dog: "Hund",
                Cat: "Katt",
                Paw: "Tass",
              };

              return (
                <div
                  key={stampcard.id}
                  onClick={(event) => {
                    if (
                      event.target instanceof HTMLElement &&
                      event.target.className.includes("delete-button")
                    ) {
                      event.preventDefault();
                      setSelectedStampCardId(null);
                    } else {
                      setSelectedStampCardId(stampcard.id);
                      console.log(selectedStampCard);
                      openModal("stampInFocus", selectedMember, stampcard.id);
                    }
                  }}
                  className="m-2 flex flex-col flex-wrap gap-1 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 text-stone-200 drop-shadow-xl/25 lg:max-w-lg"
                >
                  <div className="flex w-full justify-between text-white">
                    <p>{new Date(stampcard.createdAt).toLocaleDateString()}</p>
                    <p>{typeTranslation[stampcard.type] || stampcard.type}</p>
                  </div>

                  <div className="mt-2 flex gap-3">
                    {stampcard.stamps.map((stamp) => (
                      <div
                        key={stamp.id}
                        title={`Namn: ${stamp.brand}, Pris: ${stamp.price}`}
                        className="flex items-center justify-center rounded-full border border-white bg-white shadow md:h-5 md:w-5 lg:h-9 lg:w-9"
                      >
                        <p>🐾</p>
                      </div>
                    ))}
                    {stampcard.pawStamps.map((pawStamp) => (
                      <div
                        key={pawStamp.id}
                        className="flex items-center justify-center rounded-full border border-white bg-white shadow md:h-5 md:w-5 lg:h-9 lg:w-9"
                      >
                        <p>🐾</p>
                      </div>
                    ))}
                    {[...Array(empty).keys()].map((idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="rounded-full border-2 border-white md:h-5 md:w-5 lg:h-9 lg:w-9"
                      />
                    ))}
                  </div>
                  <div className="delete-button w-5 place-self-end">
                    <DeleteStampCard id={stampcard.id} />
                  </div>
                </div>
              );
            })}
          </ul>
        ) : (
          <p className="md:pb-2 md:pl-2">Inga stämpelkort hittades..</p>
        )}
      </div>
    </div>
  );
}
