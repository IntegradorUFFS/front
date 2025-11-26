import React from "react";
import { Filter } from "@mynaui/icons-react";

const index: React.FC = () => {
  return (
    <button className="border border-neutral-3 hover:border-neutral-4 focus:ring-1 rounded-lg gap-2 px-2 py-2 text-neutral-7 flex items-center justify-start text-sm">
      <div className="text-blueRibbon-5 relative">
        <span className="absolute w-[5px] h-[5px] bg-[#F5930B] rounded-full top-0 right-0" />
        <Filter width={22} />
      </div>
      Filtros
    </button>
  );
};

export default index;
