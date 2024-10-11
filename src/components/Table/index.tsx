import { twMerge } from "tailwind-merge";

interface IProps {
  items: string[];
}

const Table: React.FC<IProps> = ({ items = ["o", "o"] }) => {
  return (
    <div className="flex-1">
      <div
        className={twMerge(
          "bg-zinc-200 rounded-xl grid py-2 px-3 text-base font-montserrat",
          items?.length && `grid-cols-[repeat(${items?.length},_1fr)_100px]`
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
