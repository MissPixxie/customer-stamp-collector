"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";
import { MemberCard } from "./memberCard";
import type { StampCard } from "@prisma/client";
import { useSelectedMember } from "../memberContextProvider";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

export function ListMembers() {
  const [listAllMembers] = api.member.listAllMembers.useSuspenseQuery();
  const { setSelectedMember, selectedMember } = useSelectedMember();

  const handleSetSelectedMember = (
    newMember: MemberWithCardsAndStamps | null,
  ) => {
    if (!newMember || newMember.id !== selectedMember?.id) {
      setSelectedMember(newMember);
    }
  };

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-x-2 gap-y-2.5 rounded-md bg-white">
        {listAllMembers && listAllMembers.length > 0 ? (
          <div>
            <h2 className="text-center text-lg font-bold text-white dark:text-black">
              All Members:
            </h2>
            {listAllMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => {
                  handleSetSelectedMember(member);
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
