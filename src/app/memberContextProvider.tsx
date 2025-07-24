"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Member } from "@prisma/client";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

type SelectedMemberContextType = {
  selectedMemberId: number | null;
  setSelectedMemberId: (member: number | null) => void;
};

export const SelectedMemberContext = createContext<
  SelectedMemberContextType | undefined
>(undefined);

export const SelectedMemberProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  return (
    <SelectedMemberContext.Provider
      value={{ selectedMemberId, setSelectedMemberId }}
    >
      {children}
    </SelectedMemberContext.Provider>
  );
};

export const useSelectedMemberContext = () => {
  const context = useContext(SelectedMemberContext);
  if (!context)
    throw new Error(
      "useSelectedMember måste användas inom SelectedMemberProvider",
    );
  return context;
};
