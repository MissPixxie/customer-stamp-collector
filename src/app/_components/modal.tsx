"use client";

import { useState, type ReactNode } from "react";
import { useModal } from "../modalContext";
import { StampDetails } from "./stampDetails";
import type { Stamp } from "@prisma/client";

// type StampProps = {
//   id: number;
//   name: string;
//   price: string;
// };

const Modal = ({ stamp }: { stamp?: Stamp }) => {
  const { isModalOpen, closeModal } = useModal();
  console.log(stamp);
  if (!isModalOpen) return null;
  if (!stamp) return <div>No stamps!</div>;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <StampDetails stamp={stamp} />
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
