"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";
import { CustomerCard } from "./customerCard";
import type { StampCard } from "@prisma/client";
import { useSelectedMember } from "../memberContextProvider";

// type CustomerProps = {
//   customer: {
//     id: number;
//     medlemsNr: number;
//     createdAt: Date;
//     updatedAt: Date;
//     stampCards: {
//       id: number;
//       customerid: number;
//       createdAt: Date;
//       updatedAt: Date;
//       stamps: {
//         id: number;
//         name: string;
//         price: string;
//         createdAt: Date;
//         updatedAt: Date;
//       }[];
//     }[];
//   };
// };

export function ListCustomers() {
  const [listAllCustomers] = api.customer.listAllCustomers.useSuspenseQuery();
  const { setSelectedMember } = useSelectedMember();

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-x-2 gap-y-2.5 rounded-md bg-white">
        {listAllCustomers && listAllCustomers.length > 0 ? (
          <div>
            <h2 className="text-center text-lg font-bold text-white dark:text-black">
              All Customers:
            </h2>
            {listAllCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => {
                  setSelectedMember(customer);
                }}
              >
                <CustomerCard key={customer.id} customer={customer} />
              </div>
            ))}
          </div>
        ) : (
          <p>You have no customers yet.</p>
        )}
      </div>
    </div>
  );
}
