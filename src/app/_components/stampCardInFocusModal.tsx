"use client";

import { useModal } from "../modalContext";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import { useState } from "react";

export default function StampCardInFocusModal() {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");
  const { activeModal, closeModal } = useModal();
  const { selectedMember } = useSelectedMember();
  const [typeOfAnimal, setTypeOfAnimal] = useState<"Cat" | "Dog">("Cat");

  const createStampCard = api.stampCard.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stampcard has been added successfully!");
    },
    onError: (error) => {
      setMessage(`Error while adding stampcard: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMember) {
      const membersNr = selectedMember.id;
      const type = typeOfAnimal;
      createStampCard.mutate({ membersNr, type });
    }
  };

  if (activeModal !== "stampInFocus" || selectedMember === null) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form>
          <label className="custom-radio">
            <input
              type="radio"
              name="typeOfAnimal"
              value="cat"
              onClick={() => setTypeOfAnimal("Cat")}
            />
            <span></span> Katt
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="typeOfAnimal"
              value="dog"
              onClick={() => setTypeOfAnimal("Dog")}
            />
            <span></span> Hund
          </label>
        </form>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="rounded-md border border-gray-300 p-4 shadow-sm"
            >
              <p className="mb-2 font-semibold">Stämpel {index + 1}</p>
              <input
                type="text"
                placeholder="Fodernamn"
                name={`stamp[${index}].name`}
                className="mb-2 w-full rounded border px-3 py-1"
              />
              <input
                type="text"
                placeholder="Storlek"
                name={`stamp[${index}].size`}
                className="mb-2 w-full rounded border px-3 py-1"
              />
              <input
                type="text"
                placeholder="Pris"
                name={`stamp[${index}].price`}
                className="w-full rounded border px-3 py-1"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="submit"
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Spara
          </button>
          <button
            onClick={closeModal}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
}
