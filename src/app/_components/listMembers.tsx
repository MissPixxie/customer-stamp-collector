"use client";

import { api } from "stampCollector/trpc/react";
import { MemberCard } from "./memberCard";
import { useSelectedMember } from "../hooks/useSelectedMember";

export function ListMembers() {
  const [listAllMembers] = api.member.listAllMembers.useSuspenseQuery();
  const { setSelectedMemberId } = useSelectedMember();

  return (
    <div className="flex flex-row gap-5 md:w-full md:justify-center">
      <div className="flex flex-col gap-x-2 gap-y-2.5 rounded-md bg-white dark:bg-stone-800">
        {listAllMembers && listAllMembers.length > 0 ? (
          <div>
            <h2 className="md:text-md text-center text-lg font-bold text-black dark:text-stone-300">
              Alla Medlemmar
            </h2>
            {listAllMembers.map((member) => (
              <div
                className="md:mt-3 md:mb-1 md:pr-1 md:pl-1"
                key={member.id}
                onClick={() => {
                  setSelectedMemberId(member.membersNr);
                }}
              >
                <MemberCard key={member.id} member={member} />
              </div>
            ))}
          </div>
        ) : (
          <p>You have no members yet.</p>
        )}
      </div>
    </div>
  );
}
