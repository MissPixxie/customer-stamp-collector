"use client";

import { useModal } from "../modalContext";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import { useState } from "react";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";
import { StampCardType, type Stamp } from "@prisma/client";

export default function StampCardInFocusModal() {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");
  const { activeModal, closeModal } = useModal();
  const { selectedMember } = useSelectedMember();
  const { selectedStampCard, refetch } = useSelectedStampCard();
  const { Cat, Dog } = StampCardType;
  const [stampIndex, setStampIndex] = useState<number | null>(null);
  const [stamps, setStamps] = useState(
    Array(6).fill({ brand: "", size: "", price: "" }),
  );
  console.log(message);
  const handleChange = (index: number, field: string, value: string) => {
    const newStamps = [...stamps];
    newStamps[index] = { ...newStamps[index], [field]: value };
    setStamps(newStamps);
    setStampIndex(index);
  };

  const createStamp = api.stamp.create.useMutation({
    onSuccess: async () => {
      await utils.stampCard.getStampCard.invalidate();
      setMessage("Stamp has been added successfully!");
      await refetch();
      closeModal();
    },
    onError: (error) => {
      setMessage(`Error while adding stamp: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(stampIndex);
    if (stampIndex !== null) {
      const stamp = stamps[stampIndex];

      if (selectedStampCard && stamp) {
        const stampCardId = selectedStampCard.id;
        const stampBrand = stamp.brand;
        const stampSize = stamp.size;
        const stampPrice = stamp.price;

        createStamp.mutate({
          stampCardId,
          stampBrand,
          stampSize,
          stampPrice,
        });
        setMessage("Stämpeln har lagts till!");
      }
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
        <div className="m-auto w-full">
          <form className="flex justify-center pb-5 pl-7">
            <label className="custom-radio">
              <input
                type="radio"
                name="typeOfAnimal"
                value="cat"
                checked={selectedStampCard?.type === Cat}
              />
              <span></span> Katt
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="typeOfAnimal"
                value="dog"
                checked={selectedStampCard?.type === Dog}
              />
              <span></span> Hund
            </label>
          </form>
        </div>
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
                name={`stamp[${index}].brand`}
                value={stamps[index].brand}
                onChange={(e) => handleChange(index, "brand", e.target.value)}
                className="mb-2 w-full rounded border px-3 py-1"
              />
              <input
                type="text"
                placeholder="Storlek"
                name={`stamp[${index}].size`}
                value={stamps[index].size}
                onChange={(e) => handleChange(index, "size", e.target.value)}
                className="mb-2 w-full rounded border px-3 py-1"
              />
              <input
                type="text"
                placeholder="Pris"
                name={`stamp[${index}].price`}
                value={stamps[index].price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="w-full rounded border px-3 py-1"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="submit"
            onClick={handleSubmit}
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
