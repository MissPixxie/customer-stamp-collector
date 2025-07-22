"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateMember() {
  const [getMember] = api.member.getMember.useSuspenseQuery();

  const utils = api.useUtils();
  const [membersNr, setMembersNr] = useState("");
  const [membersName, setMembersName] = useState("");
  const [message, setMessage] = useState<string>("");

  const createMember = api.member.create.useMutation({
    onSuccess: async () => {
      await utils.member.invalidate();
      setMembersNr("");
      setMessage("Member has been added successfully!");
    },
    onError: (error) => {
      setMessage(`Error while adding member: ${error.message}`);
    },
  });
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

    const membersNrInt = parseInt(membersNr, 10);

    if (isNaN(membersNrInt)) {
      setMessage("MembersNr is invalid");
      return;
    }

    if (!getMember?.membersNr) {
      createMember.mutate({ membersNr: membersNrInt, name: membersName });
      createStampCard.mutate({ membersNr: membersNrInt });
    } else {
      setMessage("An unexpected error occurrd. Try again.");
    }
  };

  return (
    <div className="h-100 w-full max-w-xs rounded-2xl shadow-purple-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl bg-amber-200 p-2"
      >
        <input
          type="text"
          placeholder="medlemsnummer"
          value={membersNr}
          onChange={(e) => setMembersNr(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <input
          type="text"
          placeholder="namn (frivillig)"
          value={membersName}
          onChange={(e) => setMembersName(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <button
          type="submit"
          className="max-w-50 self-center rounded-4xl bg-white/50 px-10 py-3 font-semibold text-white transition hover:bg-white/20 dark:text-black"
          disabled={createMember.isPending}
        >
          {createMember.isPending ? "Skapar kund..." : "Skapa kund"}
        </button>
      </form>
      {message && <div className="mt-4 text-center">{message}</div>}
    </div>
  );
}
