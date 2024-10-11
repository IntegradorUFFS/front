import { BoltIcon, Trash, Trash2 } from "lucide-react";
import { DynamicGrid } from "../styles";

interface IProps {
  items: string[];
}

const TableRow: React.FC<IProps> = ({ items }) => {
  return (
    <div className="flex-1">
      <DynamicGrid
        className="rounded-xl grid py-2 px-3 text-base font-montserrat"
        length={items.length}
      >
        {items?.map((key) => (
          <div key={key}>{key}</div>
        ))}

        <div className="flex gap-3">
          <button>
            <BoltIcon />
          </button>
          <button>
            <Trash2 />
          </button>
        </div>
      </DynamicGrid>
    </div>
  );
};

export default TableRow;
