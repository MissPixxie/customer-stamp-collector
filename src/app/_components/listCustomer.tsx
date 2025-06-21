"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";
import { CustomerCard } from "./customerCard";

export function ListCustomers() {
  const [listAllCustomers] = api.customer.listAllCustomers.useSuspenseQuery();
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  return (
    <div>
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
                  setSelectedCustomer(customer.id);
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
      <div>
        {selectedCustomer ? (
          <div>Vald kund: {selectedCustomer}</div>
        ) : (
          <div>Ingen kund vals</div>
        )}
      </div>
    </div>
  );
}
