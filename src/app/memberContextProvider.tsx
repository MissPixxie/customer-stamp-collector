"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Member } from "@prisma/client";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

type SelectedMemberContextType = {
  selectedMember: MemberWithCardsAndStamps | null;
  setSelectedMember: (member: MemberWithCardsAndStamps | null) => void;
};

export const SelectedMemberContext = createContext<
  SelectedMemberContextType | undefined
>(undefined);

export const SelectedMemberProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMember, setSelectedMember] =
    useState<MemberWithCardsAndStamps | null>(null);

  return (
    <SelectedMemberContext.Provider
      value={{ selectedMember, setSelectedMember }}
    >
      {children}
    </SelectedMemberContext.Provider>
  );
};

export const useSelectedMember = () => {
  const context = useContext(SelectedMemberContext);
  if (!context)
    throw new Error(
      "useSelectedMember måste användas inom SelectedMemberProvider",
    );
  return context;
};
