import { DynamicGrid } from "./styles";

interface IProps {
  items: string[];
}

const Table: React.FC<IProps> = ({
  items = ["Nome", "Categoria", "Descrição", "Quantidade", "teste", "dois"],
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
    </div>
  );
};

export default Table;
