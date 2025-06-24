"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Customer } from "@prisma/client";

export type Member = {
  id: number;
  medlemsNr: number;
  stampCards: StampCard[];
  createdAt: Date;
  updatedAt: Date;
};

export type StampCard = {
  id: number;
  customerid: number;
  customer: Customer; // Relationen till Customer
  stamps: Stamp[]; // Relationen till Stamp
  createdAt: Date;
  updatedAt: Date;
};

export type Stamp = {
  id: number;
  name: string;
  price: string;
  stampCardId: number;
  stampCard: StampCard; // Relationen till StampCard
  createdAt: Date;
};

type SelectedMemberContextType = {
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
};

export const SelectedMemberContext = createContext<
  SelectedMemberContextType | undefined
>(undefined);

export const SelectedMemberProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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
