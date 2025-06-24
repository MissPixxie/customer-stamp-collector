"use client";

import { useState } from "react";
import type { Stamp } from "@prisma/client";

import { api } from "stampCollector/trpc/react";

type StampProps = {
  stamp: {
    id: number;
    name: string;
    price: string;
  };
};
export function StampDetails({ stamp }: StampProps) {
  console.log("stampDetails", stamp.name);
  return (
    <div>
      {stamp ? (
        <div className="h-15 w-15 rounded-full bg-blue-500">
          <p className="text-xs text-white dark:text-black">{stamp.name}</p>
          <p>{stamp.price}:-</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
