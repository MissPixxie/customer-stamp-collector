"use client";
import { useState } from "react";
import { api } from "stampCollector/trpc/react";
import { ListMembers } from "./listMembers";
import SearchBar from "./search";

export default function LeftMain() {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-2 drop-shadow-xl/50 md:w-95 md:p-1 lg:w-fit dark:bg-stone-800">
      <SearchBar />
      <ListMembers />
    </div>
  );
}
