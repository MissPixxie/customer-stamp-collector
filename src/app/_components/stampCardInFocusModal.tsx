"use client";

import { useModal } from "../modalContext";
import { api } from "stampCollector/trpc/react";
import { useSelectedMember } from "../hooks/useSelectedMember";
import { useEffect, useState } from "react";
import { useSelectedStampCard } from "../hooks/useSelectedStampCard";
import { StampCardType } from "@prisma/client";
import useCreateStamp from "../hooks/useCreateStamp";
import CreatePawStampUI from "./createPawStampUI";
import CreateFoodStampUI from "./createFoodStampUI";

export default function StampCardInFocusModal() {
  const utils = api.useUtils();
  const { activeModal, closeModal } = useModal();
  const { selectedMember } = useSelectedMember();
  const { selectedStampCard, setSelectedStampCardId, refetch } =
    useSelectedStampCard();
  const { Cat, Dog, Paw } = StampCardType;

  if (activeModal !== "stampInFocus" || selectedMember === null) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30 md:h-fit lg:h-full"
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
            <label className="custom-radio">
              <input
                type="radio"
                name="typeOfAnimal"
                value="paw"
                checked={selectedStampCard?.type === Paw}
                readOnly
              />
              <span></span> Tass
            </label>
          </form>
        </div>
        {selectedStampCard?.type === Paw && (
          <CreatePawStampUI closeModal={closeModal} />
        )}
        {(selectedStampCard?.type === Dog ||
          selectedStampCard?.type === Cat) && (
          <CreateFoodStampUI closeModal={closeModal} />
        )}
      </div>
    </div>
  );
}
