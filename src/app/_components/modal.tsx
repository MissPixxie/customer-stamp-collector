"use client";

import { useState } from "react";
import { useModal } from "../modalContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold">This is a modal</h2>
        <p className="mt-4 text-gray-600">You can add any content here.</p>
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
