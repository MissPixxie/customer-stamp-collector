"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateCustomer() {
  const [getCustomer] = api.customer.getCustomer.useSuspenseQuery();

  const utils = api.useUtils();
  const [medlemsNr, setMedlemsNr] = useState("");
  const [message, setMessage] = useState<string>("");

  const createCustomer = api.customer.create.useMutation({
    onSuccess: async () => {
      await utils.customer.invalidate();
      setMedlemsNr("");
      setMessage("Kunden har lagts till korrekt!");
    },
    onError: (error) => {
      setMessage(`Fel vid kundtillägg: ${error.message}`);
    },
  });
  const createStampCard = api.stampCard.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stämpelkortet har lagts till korrekt!");
    },
    onError: (error) => {
      setMessage(`Fel vid tillägg: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const medlemsNrInt = parseInt(medlemsNr, 10);

    if (isNaN(medlemsNrInt)) {
      setMessage("Medlemsnummer är ogiltigt");
      return;
    }

    if (!getCustomer?.medlemsNr) {
      createCustomer.mutate({ medlemsNr: medlemsNrInt });
      createStampCard.mutate({ customerId: medlemsNrInt });
    } else {
      setMessage("Ett oväntat fel inträffade. Försök igen.");
    }
  };

  return (
    <div className="h-100 w-full max-w-xs rounded-2xl bg-teal-300 shadow-purple-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl bg-amber-200 p-2"
      >
        <input
          type="text"
          placeholder="medlemsnummer"
          value={medlemsNr}
          onChange={(e) => setMedlemsNr(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <button
          type="submit"
          className="max-w-50 self-center rounded-4xl bg-white/50 px-10 py-3 font-semibold text-white transition hover:bg-white/20 dark:text-black"
          disabled={createCustomer.isPending}
        >
          {createCustomer.isPending ? "Skapar kund..." : "Skapa kund"}
        </button>
      </form>
      <button className="max-w-50 rounded-4xl bg-green-700/50 px-10 py-3 text-sm font-normal text-white transition hover:bg-green-700/30 dark:text-black">
        Nytt stämpelkort
      </button>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
}
