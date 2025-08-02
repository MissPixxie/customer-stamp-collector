import { useState, type MouseEventHandler } from "react";
import useCreateStamp from "../hooks/useCreateStamp";

type Props = {
  closeModal: () => void;
};

export default function CreatePawStampUI({ closeModal }: Props) {
  const [pawStamps, setPawStamps] = useState(Array(8));
  const { submitPawStamp, isLoading, message } = useCreateStamp();

  return (
    <div
      className="w-full max-w-sm rounded-lg bg-white p-6 text-black shadow-lg dark:bg-stone-800 dark:text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[...Array(8)].map((_, index) => {
          const pawStamp = pawStamps[index];

          return (
            <div
              key={index}
              className="cursor-pointer rounded-md border border-gray-300 p-4 shadow-sm dark:border-black dark:bg-stone-900"
              onClick={submitPawStamp}
            >
              <p className="mb-2 font-semibold dark:text-stone-300">
                Stämpel {index + 1}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end gap-2">
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
