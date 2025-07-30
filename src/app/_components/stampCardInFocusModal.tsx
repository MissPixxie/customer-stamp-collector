"use client";

import { useModal } from "../modalContext";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import { useState } from "react";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";
import { StampCardType } from "@prisma/client";

export default function StampCardInFocusModal() {
  const utils = api.useUtils();
  const [message, setMessage] = useState<string>("");
  const { activeModal, closeModal } = useModal();
  const { selectedMember } = useSelectedMember();
  const { selectedStampCard, refetch } = useSelectedStampCard();
  const { Cat, Dog } = StampCardType;
  const [stampIndex, setStampIndex] = useState<number | null>(null);
  const [stamps, setStamps] = useState(
    Array(7).fill({ brand: "", size: "", price: "" }),
  );

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
    if (stampIndex !== null) {
      const stamp = stamps[stampIndex];
      if (selectedStampCard && stamp) {
        createStamp.mutate({
          stampCardId: selectedStampCard.id,
          stampBrand: stamp.brand,
          stampSize: stamp.size,
          stampPrice: stamp.price,
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
        className="w-full max-w-sm rounded-lg bg-white p-6 text-black shadow-lg dark:bg-stone-800 dark:text-white"
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
                readOnly
              />
              <span></span> Katt
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="typeOfAnimal"
                value="dog"
                checked={selectedStampCard?.type === Dog}
                readOnly
              />
              <span></span> Hund
            </label>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[...Array(7)].map((_, index) => {
            const stamp = stamps[index];

            if (index === 6) {
              const lowestPrice = Math.min(
                ...stamps
                  .slice(0, 6)
                  .map((s) => parseFloat(s.price || "0"))
                  .filter((n) => !isNaN(n)),
              );
              const price = parseFloat(stamp?.price || "0");
              const difference =
                !isNaN(price) && !isNaN(lowestPrice) ? price - lowestPrice : 0;

              return (
                <div
                  key={index}
                  className="rounded-md border border-gray-300 p-4 shadow-sm dark:border-black dark:bg-stone-900"
                >
                  <p className="mb-2 font-semibold dark:text-stone-300">
                    Stämpel 7
                  </p>
                  <input
                    type="text"
                    placeholder="Pris"
                    name={`stamp[${index}].price`}
                    value={stamp.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className="mb-2 w-full rounded border px-3 py-1 dark:border-black dark:bg-stone-800"
                  />
                  <p className="text-sm text-stone-300">
                    Rabatt i kr:{" "}
                    <span className="font-bold">
                      {difference.toFixed(2)} kr
                    </span>
                  </p>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="rounded-md border border-gray-300 p-4 shadow-sm dark:border-black dark:bg-stone-900"
              >
                <p className="mb-2 font-semibold dark:text-stone-300">
                  Stämpel {index + 1}
                </p>
                <input
                  type="text"
                  placeholder="Fodernamn"
                  name={`stamp[${index}].brand`}
                  value={stamp.brand}
                  onChange={(e) => handleChange(index, "brand", e.target.value)}
                  className="mb-2 w-full rounded border px-3 py-1 dark:border-black dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="Storlek"
                  name={`stamp[${index}].size`}
                  value={stamp.size}
                  onChange={(e) => handleChange(index, "size", e.target.value)}
                  className="mb-2 w-full rounded border px-3 py-1 dark:border-black dark:bg-stone-800"
                />
                <input
                  type="text"
                  placeholder="Pris"
                  name={`stamp[${index}].price`}
                  value={stamp.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                  className="w-full rounded border px-3 py-1 dark:border-black dark:bg-stone-800"
                />
              </div>
            );
          })}
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
