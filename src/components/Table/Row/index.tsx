import React from "react";
import { BoltIcon, Trash2 } from "lucide-react";
import { DynamicGrid } from "../styles";
import dig from "@/helpers/dig";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
  }[];
  data: Record<string, any>;
  onEdit?: (params?: any) => void;
  onDelete?: (params?: any) => void;
}

const TableRow: React.FC<IProps> = ({ fields, data, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <DynamicGrid
        className="rounded-xl grid py-2 px-3 text-base font-montserrat"
        length={fields.length}
      >
        {fields?.map(({ title, keys }) => (
          <div key={title}>{dig(data, keys) ?? ""}</div>
        ))}

        <div className="flex gap-3 justify-end opacity-70">
          {onEdit && (
            <button onClick={() => onEdit(data)} type="button">
              <BoltIcon size={18} />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(data)} type="button">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </DynamicGrid>
    </div>
  );
};

export default TableRow;
