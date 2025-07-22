"use client";

import { useState } from "react";
import type { Stamp } from "@prisma/client";
import { api } from "stampCollector/trpc/react";

export function StampDetails({ stamp }: { stamp: Stamp }) {
  console.log("stampDetails", stamp.name);
  return (
    <div>
      {stamp ? (
        <div className="h-15 w-15 rounded-full bg-gray-500">
          <p className="text-xs text-white dark:text-black">{stamp.name}</p>
          <p>{stamp.price}:-</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
