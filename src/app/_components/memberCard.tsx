"use client";

import type { Member, StampCard } from "@prisma/client";
import type { MouseEventHandler } from "react";
import { CreateStampCard } from "./createStampCard";
import { api } from "stampCollector/trpc/react";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

// type CustomerProps = {
//   customer: {
//     id: number;
//     medlemsNr: number;
//     stampCards: StampCard[];
//     createdAt: Date;
//     updatedAt: Date;
//   };
// };

export function MemberCard({ member }: { member: MemberWithCardsAndStamps }) {
  const { data: stampCards, refetch } = api.stampCard.getStampCard.useQuery(
    { membersNr: member.membersNr }, // Skicka customerId som parameter
    { enabled: !!member.membersNr }, // Se till att queryn endast körs om customer.id är tillgänglig
  );
  console.log("Stuff from customerCard", stampCards);

  return (
    <div className="m-2 flex max-w-lg transform flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25 transition-transform duration-200 ease-in-out hover:scale-105">
      <div className="flex grow flex-row justify-between">
        <p className="truncat">Medlemsnummer: {member.membersNr}</p>
        <p>
          <strong>Skapad: </strong>
          {new Date(member.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex grow flex-col">
        <h4 className="mt-4 text-lg font-semibold">Stämpelkort:</h4>
        {member.stampCards.length > 0 ? (
          <ul className="cursor-pointer list-disc pl-5">
            {member.stampCards.map((stampcard) => (
              <li key={stampcard.id}>Stämpelkort ID: {stampcard.id}</li>
            ))}
          </ul>
        ) : (
          <p>Inga stämpelkort hittades..</p>
        )}
        <CreateStampCard membersNr={member.id} />
      </div>
    </div>
  );
}
