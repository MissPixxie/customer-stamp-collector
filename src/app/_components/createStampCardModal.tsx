"use client";

import { useModal } from "../modalContext";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import { useState } from "react";
import { StampCardType } from "@prisma/client";

export default function CreateStampCardModal() {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");
  const { activeModal, closeModal } = useModal();
  const { selectedMember, refetch } = useSelectedMember();
  const { Cat, Dog, Paw } = StampCardType;
  const [stampCardType, setStampCardType] = useState<StampCardType>(Cat);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createStampCard = api.stampCard.create.useMutation({
    onSuccess: async () => {
      await utils.member.listAllMembers.invalidate();
      await utils.member.getMember.invalidate(selectedMember?.membersNr);
      await refetch();
      setIsSubmitting(false);
      closeModal();
    },
    onError: (error) => {
      setMessage(`Fel: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (selectedMember) {
      const membersNr = selectedMember.id;
      const type = stampCardType;
      createStampCard.mutate({ membersNr, type });
    }
  };

  if (activeModal !== "createStamp" || selectedMember === null) return null;

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
              onClick={() => setStampCardType(Cat)}
            />
            <span></span> Katt
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="typeOfAnimal"
              value="dog"
              onClick={() => setStampCardType(Dog)}
            />
            <span></span> Hund
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="typeOfAnimal"
              value="paw"
              onClick={() => setStampCardType(Paw)}
            />
            <span></span> Tass
          </label>
        </form>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Skapa nytt
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
