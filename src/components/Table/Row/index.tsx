import React from "react";
import { BoltIcon, Trash2 } from "lucide-react";
import { DynamicGrid } from "../styles";
import dig from "@/helpers/dig";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
    transform?: (item: any, row: Record<string, any>) => any;
  }[];
  data: Record<string, any>;
  onEdit?: (params?: any) => void;
  onDelete?: (params?: any) => void;
  buttons?: number;
}

const TableRow: React.FC<IProps> = ({
  fields,
  data,
  onEdit,
  onDelete,
  buttons,
}) => {
  return (
    <div className="w-full">
      <DynamicGrid
        className="rounded-xl grid py-2 px-3 text-base font-montserrat"
        length={fields.length}
        buttons={buttons}
      >
        {fields?.map(({ title, transform, keys }) => (
          <div key={title}>
            {transform
              ? transform(dig(data, keys), data)
              : dig(data, keys) ?? ""}
          </div>
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
