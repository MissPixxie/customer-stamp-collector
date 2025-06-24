import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  title: string;
  onClickEvent: MouseEventHandler;
  children: ReactNode;
};
export function Button({ title, onClickEvent, children }: ButtonProps) {
  return (
    <div>
      <button
        title={title}
        className="max-w-50 rounded-4xl bg-green-700/50 px-10 py-3 text-sm font-normal text-white transition hover:bg-green-700/30 dark:text-black"
        onClick={onClickEvent}
      >
        {children}
      </button>
    </div>
  );
}
