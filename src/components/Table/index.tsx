import {
  ChevronLeft20Filled,
  ChevronRight20Filled,
} from "@fluentui/react-icons";
import TableRow from "./Row";
import { DynamicGrid } from "./styles";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
  }[];
  data: Record<string, any>[];
  onEdit?: (params?: any) => void;
  onDelete?: (params?: any) => void;
}

const Table: React.FC<IProps> = ({ fields, data, onDelete, onEdit }) => {
  return (
    <div className="flex-1">
      <DynamicGrid
        className="bg-zinc-200 rounded-xl grid py-2 px-3 text-base font-montserrat"
        length={fields.length}
      >
        {fields?.map(({ title }) => (
          <div key={title}>{title}</div>
        ))}
      </DynamicGrid>

      {data?.map((item, i) => (
        <TableRow
          key={`row-${i}`}
          fields={fields}
          data={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      <div dir="rtl">
        <div
          dir="ltr"
          className="bg-zinc-200 rounded-xl py-2 px-4 text-base font-montserrat w-40 flex justify-between mt-2 font-semibold"
        >
          <p>10 de 30</p>
          <div className="flex gap-1 h-full my-auto">
            <button>
              <ChevronLeft20Filled />
            </button>
            <button>
              <ChevronRight20Filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
