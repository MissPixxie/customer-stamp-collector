"use client";

import { api } from "stampCollector/trpc/react";
import { MemberCard } from "./memberCard";
import { useSelectedMember } from "../hooks/useSelectedMember";

export function ListMembers() {
  const [listAllMembers] = api.member.listAllMembers.useSuspenseQuery();
  const { setSelectedMemberId } = useSelectedMember();

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-x-2 gap-y-2.5 rounded-md bg-white">
        {listAllMembers && listAllMembers.length > 0 ? (
          <div>
            <h2 className="text-center text-lg font-bold text-white dark:text-black">
              Alla Medlemmar
            </h2>
            {listAllMembers.map((member) => (
              <div
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
