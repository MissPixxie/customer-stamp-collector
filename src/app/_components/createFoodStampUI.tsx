import { StampCardType } from "@prisma/client";
import { useEffect, useState } from "react";
import useCreateStamp from "../hooks/useCreateStamp";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";

type Props = {
  closeModal: () => void;
};

export default function CreateFoodStampUI({ closeModal }: Props) {
  const [stampIndex, setStampIndex] = useState<number | null>(null);
  const { submitRegularStamp, isLoading, message } = useCreateStamp();
  const { selectedStampCard, setSelectedStampCardId, refetch } =
    useSelectedStampCard();
  const [stamps, setStamps] = useState(
    Array(7).fill({ brand: "", size: "", price: "" }),
  );

  useEffect(() => {
    if (selectedStampCard?.stamps && selectedStampCard.stamps.length > 0) {
      const mapped = selectedStampCard.stamps.map((s) => ({
        brand: s.brand,
        size: s.size ?? "",
        price: s.price,
      }));

      while (mapped.length < 7) {
        mapped.push({ brand: "", size: "", price: "" });
      }

      setStamps(mapped.slice(0, 7));
    } else {
      setStamps(Array(7).fill({ brand: "", size: "", price: "" }));
    }
  }, [selectedStampCard]);

  const handleChange = (index: number, field: string, value: string) => {
    const newStamps = [...stamps];
    newStamps[index] = { ...newStamps[index], [field]: value };
    setStamps(newStamps);
    setStampIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stampIndex !== null) {
      const stamp = stamps[stampIndex];
      if (stamp) {
        submitRegularStamp(stamp);
      }
    }
  };

  return (
    <div
      className="w-full max-w-sm rounded-lg bg-white p-6 text-black shadow-lg dark:bg-stone-800 dark:text-white"
      onClick={(e) => e.stopPropagation()}
    >
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
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                  className="mb-2 w-full rounded border px-3 py-1 dark:border-black dark:bg-stone-800"
                />
                <p className="text-sm text-stone-300">
                  <span className="font-bold">
                    {" "}
                    {price} - {lowestPrice} ={difference.toFixed()} kr
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
          disabled={isLoading}
          className={`rounded-lg px-4 py-2 text-white ${
            isLoading
              ? "cursor-not-allowed bg-green-300"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? "Sparar..." : "Spara"}
        </button>
        <button
          onClick={closeModal}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
