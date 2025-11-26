import React from "react";
import { Bell } from "@mynaui/icons-react";

const index: React.FC = () => {
  return (
    <button
      className="rounded-lg border border-neutral-3 hover:border-neutral-4 focus:ring-1  gap-2 px-2 py-2 text-neutral-7 text-sm w-[42px]
  flex items-center justify-center"
    >
      <div className="text-blueRibbon-5 relative">
        <span className="absolute w-[5px] h-[5px] bg-[#F5930B] rounded-full top-0 right-0" />
        <Bell width={22} />
      </div>
    </button>
  );
};

export default index;
