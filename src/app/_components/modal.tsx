"use client";

import { useState } from "react";

import { api } from "stampCollector/trpc/react";

export function Modal(onClick: boolean) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <div className="w-full max-w-xs">{visible ? <h1>Modal</h1> : <p></p>}</div>
  );
}
