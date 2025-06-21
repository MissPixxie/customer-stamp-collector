"use client";
import { useSelectedMember, type Member } from "../memberContextProvider";
import { CustomerCard } from "./customerCard";
import { StampCardInFocus } from "./stampCardInFocus";

export function MemberInFocus() {
  const { selectedMember } = useSelectedMember();
  return (
    <div>
      <div>
        <h1 className="text-center text-lg font-bold text-white dark:text-black">
          Medlem i fokus
        </h1>
        {selectedMember ? (
          <CustomerCard customer={selectedMember} />
        ) : (
          <h1 className="text-center text-lg font-bold text-white dark:text-black"></h1>
        )}
      </div>
      <div>
        {selectedMember!.stampCards.length > 0 ? (
          <ul>
            {selectedMember?.stampCards.map((stampcard) => (
              <li key={stampcard.id}>Stämpelkort id: {stampcard.id}</li>
            ))}
          </ul>
        ) : (
          <p>Inga stämpelkort hittades</p>
        )}
        {/* <StampCardInFocus stampCard={selectedMember?.stampCards}/> */}
      </div>
    </div>
  );
}
