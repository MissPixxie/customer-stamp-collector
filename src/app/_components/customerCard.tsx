"use client";

import type { StampCard } from "@prisma/client";
import type { MouseEventHandler } from "react";
import { CreateStampCard } from "./createStampCard";
import { api } from "stampCollector/trpc/react";

type CustomerProps = {
  customer: {
    id: number;
    medlemsNr: number;
    stampCards: StampCard[];
    createdAt: Date;
    updatedAt: Date;
  };
};

export function CustomerCard({ customer }: CustomerProps) {
  const { data: stampCards, refetch } = api.stampCard.getStampCard.useQuery(
    { customerId: customer.id }, // Skicka customerId som parameter
    { enabled: !!customer.id }, // Se till att queryn endast körs om customer.id är tillgänglig
  );

  return (
    <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-3 drop-shadow-xl/25">
      <div className="flex grow flex-row justify-between">
        <p className="truncat">Medlemsnummer: {customer.medlemsNr}</p>
        <p>
          <strong>Skapad: </strong>
          {new Date(customer.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex grow flex-col">
        <h4 className="mt-4 text-lg font-semibold">Stämpelkort:</h4>
        {customer.stampCards.length > 0 ? (
          <ul className="list-disc pl-5">
            {customer.stampCards.map((stampcard) => (
              <li key={stampcard.id}>Stämpelkort ID: {stampcard.id}</li>
            ))}
          </ul>
        ) : (
          <p>Inga stämpelkort hittades..</p>
        )}
        <CreateStampCard customerId={customer.id} />
      </div>
    </div>
  );
}
