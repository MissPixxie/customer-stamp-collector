"use client";

import { useState } from "react";
import { api } from "stampCollector/trpc/react";

export function CreateMember() {
  const [membersNr, setMembersNr] = useState("");
  const [membersName, setMembersName] = useState("");
  const [message, setMessage] = useState<string>("");
  console.log(message);
  const { data: getMember, refetch } = api.member.getMember.useQuery(
    membersNr ? parseInt(membersNr, 10) : undefined,
    { enabled: false },
  );
  const utils = api.useUtils();

  const createMember = api.member.create.useMutation({
    onSuccess: async () => {
      await utils.member.invalidate();
      setMembersNr("Medlemsnummer");
      setMessage("Member has been added successfully!");
    },
    onError: (error) => {
      setMessage(`Error while adding member: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const membersNrInt = parseInt(membersNr, 10);

    if (isNaN(membersNrInt)) {
      setMessage("MembersNr is invalid");
      return;
    }
    await refetch();

    if (getMember?.membersNr) {
      setMessage("This member already exists.");
    } else {
      createMember.mutate({ membersNr: membersNrInt, name: membersName });
      setMembersName("Namn (frivillig)");
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
          placeholder="Medlemsnummer"
          value={membersNr}
          onChange={(e) => setMembersNr(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <input
          type="text"
          placeholder="Namn (frivillig)"
          value={membersName}
          onChange={(e) => setMembersName(e.target.value)}
          className="w-full rounded-full bg-white/50 px-4 py-2 text-white dark:text-black"
        />
        <button
          type="submit"
          className="transform rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-600 px-5 py-3 text-black shadow-lg transition-transform duration-200 ease-in-out hover:scale-95"
        >
          Skapa Medlem
        </button>
      </form>
      {/* {message && <div className="mt-4 text-center">{message}</div>} */}
    </div>
  );
}
