"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateStampCard({ membersNr }: { membersNr: number }) {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");

  const createStampCard = api.stampCard.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stampcard has been added successfully!");
    },
    onError: (error) => {
      setMessage(`Error while adding stampcard: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createStampCard.mutate({ membersNr });
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
