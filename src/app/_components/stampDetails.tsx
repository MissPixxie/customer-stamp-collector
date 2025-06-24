"use client";

import { useState } from "react";
import type { Stamp } from "@prisma/client";

import { api } from "stampCollector/trpc/react";

export function StampDetails({ stampId }: { stampId: Stamp }) {
  console.log("stampDetails", stampId.name);
  return (
    <div>
      {stampId ? (
        <div className="h-15 w-15 rounded-full bg-blue-500">
          <p className="text-xs text-white dark:text-black">{stampId.name}</p>
          <p>{stampId.price}:-</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
