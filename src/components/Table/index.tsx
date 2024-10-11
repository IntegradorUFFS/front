import { twMerge } from "tailwind-merge";

interface IProps {
  items: string[];
}

const Table: React.FC<IProps> = ({
  items = ["Nome", "Categoria", "Descrição", "Quantidade"],
}) => {
  return (
    <div className="flex-1">
      <div
        className={twMerge(
          "bg-zinc-200 rounded-xl grid py-2 px-3 text-base font-montserrat",
          items?.length && `grid-cols-${items.length}`
        )}
      >
        {items?.map((key) => (
          <div key={key}>{key}</div>
        ))}
      </div>
    </div>
  );
};
export default Table;
