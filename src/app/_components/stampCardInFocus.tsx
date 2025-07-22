"use client";
import type { Stamp, StampCard } from "@prisma/client";
import { useSelectedMember } from "../memberContextProvider";
import { MemberCard } from "./memberCard";
import { CreateStamp } from "./createStamp";
import { StampDetails } from "./stampDetails";
import { useModal } from "../modalContext";
import Modal from "./modal";
import type { StampCardWithStamps } from "stampCollector/server/api/routers/stampCard";

export function StampCardInFocus({
  stampCard,
}: {
  stampCard: StampCardWithStamps;
}) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className="m-2 flex max-w-lg flex-wrap rounded-lg bg-pink-400 p-3 drop-shadow-xl/25">
      <h1 className="text-center text-lg font-bold text-white dark:text-black">
        Stämpelkort i fokus
      </h1>
      {stampCard ? (
        <div>
          <div>
            {stampCard ? (
              <div className="flex cursor-pointer list-disc flex-row justify-between bg-green-200 pl-5">
                {stampCard.stamps.map((stamp) => (
                  <div onClick={() => openModal(stamp)}>
                    <StampDetails key={stamp.id} stamp={stamp} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Inga stämplar hittades..</p>
            )}
          </div>
          <h1 className="text-center text-lg font-bold text-white dark:text-black">
            {new Date(stampCard.createdAt).toLocaleDateString()}
          </h1>
        </div>
      ) : (
        <h1 className="text-center text-lg font-bold text-white dark:text-black"></h1>
      )}
    </div>
  );
}
