"use client";
import { useState } from "react";
import { api } from "stampCollector/trpc/react";

export default function SearchBar() {
  const [medlemsNr, setMedlemsNr] = useState("");
  const [customer, setCustomer] = useState("");

  const utils = api.useUtils();
  const getCustomer = api.customer.getCustomer.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const medlemsNrInt = parseInt(medlemsNr, 10);

    if (isNaN(medlemsNrInt)) {
      console.error("Medlemsnummer är ogiltigt");
      return;
    }

    if (getCustomer?.data?.medlemsNr) {
      console.log("Hittad kund:", getCustomer.data.medlemsNr);
      // Gör något med medlemsNr här om du hittar en kund
    } else {
      console.log("Kunden kunde inte hittas");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-lg gap-1 rounded-md bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-2"
      >
        <input
          type="text"
          placeholder="Kund"
          value={medlemsNr}
          onChange={(e) => setMedlemsNr(e.target.value)}
          className="w-full rounded-2xl bg-white px-4 py-2 text-white dark:text-black"
        />
        <button
          type="submit"
          className="rounded-2xl bg-white px-10 py-3 font-semibold text-white transition hover:bg-white/40 dark:text-black"
        >
          Sök
        </button>
      </form>
    </div>
  );
}
