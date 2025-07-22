"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateStamp({ stampCardId }: { stampCardId: number }) {
  const [getMember] = api.member.getMember.useSuspenseQuery();

  const utils = api.useUtils();
  const [stampBrand, setStampBrand] = useState("");
  const [stampPrice, setStampPrice] = useState("");
  const [message, setMessage] = useState<string>("");

  const createStamp = api.stamp.create.useMutation({
    onSuccess: async () => {
      await utils.stamp.invalidate();
      setStampBrand("");
      setStampPrice("");
      setMessage("Stamp has been added successfully!");
    },
    onError: (error) => {
      setMessage(`Error while adding stamp: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createStamp.mutate({
      stampCardId: 1,
      stampBrand: "Doggy",
      stampPrice: "349",
    });
  };

  return (
    <div className="h-100 w-full max-w-xs rounded-2xl bg-teal-300 shadow-purple-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl bg-amber-200 p-2"
      >
        <input
          type="text"
          placeholder="Märke"
          value={stampBrand}
          onChange={(e) => setStampBrand(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <input
          type="text"
          placeholder="Pris"
          value={stampPrice}
          onChange={(e) => setStampPrice(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <button
          type="submit"
          className="max-w-50 self-center rounded-4xl bg-white/50 px-10 py-3 font-semibold text-white transition hover:bg-white/20 dark:text-black"
        ></button>
      </form>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
}
