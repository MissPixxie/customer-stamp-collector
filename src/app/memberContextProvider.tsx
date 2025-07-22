"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { Member } from "@prisma/client";
import type { MemberWithCardsAndStamps } from "stampCollector/server/api/routers/member";

// export type Member = {
//   id: number;
//   medlemsNr: number;
//   stampCards: {
//     id: number;
//     customerid: number;
//     customer: Customer; // Relationen till Customer
//     stamps: {
//       name: string;
//       id: number;
//       price: string;
//       StampCardid: number;
//       createdAt: Date;
//     }[];
//     createdAt: Date;
//     updatedAt: Date;
//   }[];
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type StampCard = {
//   id: number;
//   customerid: number;
//   customer: Customer;
//   stamps: {
//     name: string;
//     id: number;
//     price: string;
//     StampCardid: number;
//     createdAt: Date;
//   }[];
//   createdAt: Date;
//   updatedAt: Date;
// };

// export type Stamp = {
//   id: number;
//   name: string;
//   price: string;
//   stampCardid: number;
//   stampCard: StampCard; // Relationen till StampCard
//   createdAt: Date;
// };

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
