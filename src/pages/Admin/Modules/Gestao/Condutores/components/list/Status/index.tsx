import React from "react";
import { twMerge } from "tailwind-merge";

const index: React.FC<{ active: boolean }> = ({ active }) => {
  const color = active
    ? "bg-blueRibbon-2 text-blueRibbon-8"
    : "bg-neutral-3 text-neutral-6";
  return (
    <span
      className={twMerge(
        "text-sm px-2.5 py-0.5 rounded-full min-w-16 w-fit flex items-center justify-center",
        color
      )}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
};

export default index;
