import { useEffect, useState } from "react";
import useCreateStamp from "../hooks/useCreateStamp";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";

type Props = {
  closeModal: () => void;
};

export default function CreatePawStampUI({ closeModal }: Props) {
  const [pawStamps, setPawStamps] = useState<
    Array<{ stamped: boolean; createdAt?: string }>
  >(Array(8).fill({ stamped: false }));
  const { submitPawStamp, isLoading, message } = useCreateStamp();
  const { selectedStampCard, setSelectedStampCardId, refetch } =
    useSelectedStampCard();

  useEffect(() => {
    const stamps = Array(8).fill({ stamped: false });

    selectedStampCard?.pawStamps?.forEach((stamp, i) => {
      if (i < 8) {
        stamps[i] = { stamped: true, createdAt: stamp.createdAt };
      }
    });

    setPawStamps(stamps);
  }, [selectedStampCard]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {pawStamps.map((stamp, index) => {
          const isStamped = stamp.stamped;

          return (
            <div
              key={index}
              className={`flex h-20 w-20 items-center justify-center rounded-full border shadow-sm transition-colors ${
                isStamped
                  ? "bg-green-500 text-white"
                  : "border-gray-300 bg-white dark:border-black dark:bg-stone-900"
              }`}
              onClick={() => {
                if (stamp.stamped) return;

                const updated = [...pawStamps];
                updated[index] = {
                  stamped: true,
                  createdAt: new Date().toISOString(),
                };
                setPawStamps(updated);
                submitPawStamp();
              }}
            >
              {stamp.stamped && (
                <>
                  <span className="text-xl">✅</span>
                  <span className="mt-1 text-[10px]">
                    {new Date(stamp.createdAt!).toLocaleDateString("sv-SE")}
                  </span>
                </>
              )}
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
