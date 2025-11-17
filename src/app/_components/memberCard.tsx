"use client";

import { api } from "stampCollector/trpc/react";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";
import { DeleteMember } from "./deleteMember";

export function MemberCard({ member }: { member: MemberWithCardsAndStamps }) {
  const { isLoading, isError } = api.stampCard.getStampCard.useQuery(
    { membersNr: member.membersNr },
    { enabled: !!member.membersNr },
  );

  if (isLoading) {
    return (
      <div className="shimmer width-500 m-2 flex transform flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25 transition-transform duration-200 ease-in-out hover:scale-105">
        <div className="flex grow flex-row flex-wrap justify-between">
          <div className="h-6 w-full rounded bg-gray-300"></div>{" "}
          <div className="h-4 w-1/3 rounded bg-gray-300"></div>{" "}
          <div className="h-4 w-1/4 rounded bg-gray-300"></div>{" "}
        </div>
        <div className="flex grow flex-col">
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-300"></div>{" "}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error while fetching data!</div>;
  }

  return (
    <div className="flex max-w-lg transform flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 text-stone-200 drop-shadow-xl/25 transition-transform duration-200 ease-in-out hover:scale-102 md:w-full">
      <div className="flex grow flex-row flex-wrap justify-between">
        <p className="truncat">Medlemsnummer: {member.membersNr}</p>
        <p>
          <strong>Skapad: </strong>
          {new Date(member.createdAt).toLocaleDateString()}
        </p>
        {member.name && (
          <div className="w-full">
            <p>{member.name}</p>
          </div>
        )}
      </div>
      <div className="flex grow flex-col">
        <h4 className="my-4 text-lg font-semibold">Stämpelkort:</h4>
        {member.stampCards.length > 0 ? (
          <div className="flex content-evenly gap-4 pl-5 md:content-between md:gap-2 md:pl-0">
            {member.stampCards.map((stampcard) => (
              <div
                className="ph-3 flex w-23 justify-center rounded-md bg-gradient-to-r from-rose-200 via-rose-100 to-rose-300 py-2 text-white opacity-60 md:w-full dark:text-black"
                key={stampcard.id}
              >
                {stampcard.type}
              </div>
            ))}
          </div>
        ) : (
          <p>Medlemmen har inga aktiva stämpelkort..</p>
        )}
      </div>
    </div>
  );
}
