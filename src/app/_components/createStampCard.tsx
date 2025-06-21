"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateStampCard({ customerId }: { customerId: number }) {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");

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

    createStampCard.mutate({ customerId });
  };

  return (
    <div>
      <button
        className="max-w-50 self-end rounded-2xl bg-green-400/80 px-4 py-3 text-sm font-normal text-white transition hover:bg-green-900 dark:text-black"
        onClick={handleSubmit}
      >
        Nytt stämpelkort
      </button>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
}
