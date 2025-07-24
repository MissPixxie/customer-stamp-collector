"use client";

import { createContext, useState, useContext, type ReactNode } from "react";
import { useSelectedMemberContext } from "./memberContextProvider";
import type { Member } from "@prisma/client";

type ModalType = "createStamp" | "stampInFocus" | null;

type ModalContextType = {
  openModal: (modalType: ModalType, member: Member) => void;
  closeModal: () => void;
  activeModal: ModalType;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
