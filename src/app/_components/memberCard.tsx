"use client";

import { useState } from "react";
import { api } from "stampCollector/trpc/react";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

export function MemberCard({ member }: { member: MemberWithCardsAndStamps }) {
  const {
    data: stampCards,
    refetch,
    isLoading,
    isError,
  } = api.stampCard.getStampCard.useQuery(
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
    <div className="m-2 flex max-w-lg transform flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25 transition-transform duration-200 ease-in-out hover:scale-105">
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
      </div>
    </div>
  );
}
