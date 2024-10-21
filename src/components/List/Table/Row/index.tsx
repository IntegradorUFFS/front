import React from "react";
import { BoltIcon, Trash2 } from "lucide-react";
import { DynamicGrid } from "../styles";
import dig from "@/helpers/dig";
import DeleteDialog from "@/components/common/Dialog/Delete";
import Dialog from "@/components/common/Dialog";
import Form from "@/pages/Admin/Material/components/Form";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
    transform?: (item: any, row: Record<string, any>) => any;
  }[];
  data: Record<string, any>;
  onEdit?: false | ((params: any, callback: () => void) => void);
  onDelete?: false | ((data: any, callback: () => void) => void);
  buttons?: number;
  title?: string;
  form?: React.ReactNode;
}

const TableRow: React.FC<IProps> = ({
  fields,
  data,
  onEdit,
  onDelete,
  buttons,
  title,
  form,
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
            <Dialog
              triggerElement={
                <button type="button">
                  <BoltIcon size={18} />
                </button>
              }
              submitAction={(callback) => onEdit(data, callback)}
              title={title}
              cancelText="Cancelar"
              submitText="Salvar"
            >
              {form}
            </Dialog>
          )}
          {onDelete && (
            <DeleteDialog
              triggerElement={
                <button type="button">
                  <Trash2 size={18} />
                </button>
              }
              submitAction={(callback) => onDelete(data, callback)}
            />
          )}
        </div>
      </DynamicGrid>
    </div>
  );
};

export default TableRow;
