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
      setMembersNr("Medlemsnummer");
      setMembersName("Namn (frivillig)");
    }
  };

  return (
    <div className="rounded-2xl md:h-fit md:w-full md:pb-5 lg:h-100 lg:w-full lg:max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 rounded-2xl bg-white px-2 py-4 md:w-190 md:flex-row lg:w-fit lg:flex-col dark:bg-stone-800"
      >
        <input
          type="text"
          placeholder="Medlemsnummer"
          value={membersNr}
          onChange={(e) => setMembersNr(e.target.value)}
          className="rounded-md border border-black bg-white px-4 py-2 text-black md:w-full lg:w-fit dark:bg-stone-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Namn (frivillig)"
          value={membersName}
          onChange={(e) => setMembersName(e.target.value)}
          className="rounded-md border border-black bg-white px-4 py-2 text-black md:w-full lg:w-fit dark:bg-stone-700 dark:text-white"
        />
        <button
          type="submit"
          className="transform rounded-xl bg-gradient-to-r from-green-500 via-green-400 to-green-600 px-5 py-3 text-black shadow-lg transition-transform duration-200 ease-in-out hover:scale-95 md:w-full lg:w-fit"
        >
          Skapa Medlem
        </button>
      </form>
      {/* {message && <div className="mt-4 text-center">{message}</div>} */}
    </div>
  );
}
