import TableRow from "./Row";
import { DynamicGrid } from "./styles";

interface IProps {
  items: string[];
  dataLine: string[];
}

const Table: React.FC<IProps> = ({
  items = ["Nome", "Categoria", "Descrição", "Quantidade"],
  dataLine = ["Tijolo", "Construção", "Tijolo de barro", "100"],
}) => {
  return (
    <div className="flex-1">
      <DynamicGrid
        className="bg-zinc-200 rounded-xl grid py-2 px-3 text-base font-montserrat"
        length={items.length}
      >
        {items?.map((key) => (
          <div key={key}>{key}</div>
        ))}
      </DynamicGrid>

      <TableRow items={dataLine} />
    </div>
  );
};

export default Table;
