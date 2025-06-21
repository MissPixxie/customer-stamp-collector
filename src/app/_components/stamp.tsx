"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function CreateStamp() {
  const utils = api.useUtils();
  const [stampCardId, setStampCardId] = useState(0);
  const createStamp = api.stamp.create.useMutation({
    onSuccess: async () => {
      await utils.stamp.invalidate();
      setStampCardId(0);
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createStamp.mutate({ stampCardId });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="number"
          placeholder="Title"
          value={stampCardId}
          onChange={(e) => setStampCardId(e.target.valueAsNumber)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createStamp.isPending}
        >
          {createStamp.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
