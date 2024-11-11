// import React, { useState } from "react";

import { BoltIcon } from "lucide-react";
//import Button from "@/components/common/Button";

interface TitleProps {
  type?: string;
}

const TableLine: React.FC<TitleProps> = ({}) => {
  //const [active, setActive] = useState<boolean>(false);

  //const handle = setActive(false);

  return (
    <>
      <div className="w-full flex flex-row gap-2">
        <div className="w-full">Carlos - Ca</div>

        <button
          type="button"
          //onClick={() => (!active ? setActive(true) : handle)}
        >
          <BoltIcon size={18} />
        </button>
      </div>
    </>
  );
};
export default TableLine;
