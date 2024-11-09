import React, { useState } from "react";

import { BoltIcon, Trash2 } from "lucide-react";
import Button from "@/components/common/Button";

interface TitleProps {
  type?: string;
}

const TableLine: React.FC<TitleProps> = ({ type }) => {
  //const [activeDelete, setActiveDelete] = useState<boolean>(false);

  //const handleDelete = setActiveDelete(false);

  return (
    <>
      <div className="w-full flex flex-row gap-2">
        <div className="w-full">Carlos - Ca</div>

        <button
          type="button"
          //</div>onClick={() =>
          //  !activeDelete ? setActiveDelete(true) : handleDelete
          // }
        >
          <BoltIcon size={18} />
        </button>
        <button type="button">
          <Trash2 size={18} />
        </button>
      </div>
      {/* {activeDelete && (
        <Button
          text={
            "Você deseja mesmo deletar" +
            (type == "category" ? " essa categoria" : " essa unidade de medida")
          }
          className="col-span-7"
        />
      )} */}
    </>
  );
};
export default TableLine;
