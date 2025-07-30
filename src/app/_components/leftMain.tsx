"use client";
import { useState } from "react";
import { api } from "stampCollector/trpc/react";
import { ListMembers } from "./listMembers";
import SearchBar from "./search";

export default function LeftMain() {
  return (
    <div className="flex w-lg flex-col drop-shadow-xl/50">
      <SearchBar />
      <ListMembers />
    </div>
  );
}
