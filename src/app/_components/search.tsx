"use client";
import { useState } from "react";
import { api } from "stampCollector/trpc/react";

export default function SearchBar() {
  const [membersNr, setMembersNr] = useState("");

  api.useUtils();
  const getMember = api.member.getMember.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const membersNrInt = parseInt(membersNr, 10);

    if (isNaN(membersNrInt)) {
      console.error("MembersNr invalid");
      return;
    }

    if (getMember?.data?.membersNr) {
      console.log("Found member:", getMember.data.membersNr);
    } else {
      console.log("Member could not be found");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-lg gap-1 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-900 p-2 md:w-full"
      >
        <input
          type="text"
          placeholder="Kund"
          value={membersNr}
          onChange={(e) => setMembersNr(e.target.value)}
          className="w-full rounded-2xl bg-white px-4 py-2 text-black dark:bg-stone-700 dark:text-white"
        />
        <button
          type="submit"
          className="transform rounded-2xl bg-white px-10 py-3 font-semibold text-black transition-transform duration-200 ease-in-out hover:scale-95 dark:bg-stone-700 dark:text-stone-300"
        >
          Sök
        </button>
      </form>
    </div>
  );
}
