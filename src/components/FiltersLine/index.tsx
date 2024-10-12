import React, { useState, useCallback, useRef } from "react";
import { X, Scan, Plus } from "lucide-react";

interface IProps {
  possibleFilters: {
    type: string;
    description: string;
    autocomplete_endpoint?: string;
  }[];
}

const FiltersLine: React.FC<IProps> = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "teste",
    "alvenaria",
  ]);
  const activeList = useRef<HTMLUListElement>(null);

  const removeFilter = useCallback(
    (filter: string, index: number) => {
      if (activeList?.current) {
        activeList.current.children[index].classList.replace(
          "animate-width-fit",
          "animate-width-0"
        );
        setTimeout(() => {
          setActiveFilters((prevFilters) =>
            prevFilters.filter((f) => f !== filter)
          );
        }, 300);
      }
    },
    [activeList]
  );

  return (
    <ul
      className="flex gap-2 items-center flex-1 flex-wrap pt-1 pb-3"
      ref={activeList}
    >
      {activeFilters?.length > 0 &&
        activeFilters?.map((appliedFilter, i) => (
          <li
            className="list-none flex rounded-lg overflow-hidden animate-width-fit px-3 bg-zinc-100"
            key={appliedFilter}
          >
            <button
              className="py-2 font-base flex overflow-hidden gap-2 items-center w-fit max-w-full"
              onClick={() => removeFilter(appliedFilter, i)}
            >
              {appliedFilter}

              <X size={14} opacity={0.4} strokeWidth={3} />
            </button>
          </li>
        ))}

      {activeFilters?.length > 0 && (
        <hr className="w-4 border-zinc-300 rotate-90" />
      )}

      <button className="py-2 font-base flex overflow-hidden gap-2 items-center w-fit max-w-full bg-zinc-100 rounded-lg px-3">
        <div className="relative items-center justify-center flex">
          <Scan size={20} strokeWidth={1.5} />
          <Plus size={12} className="absolute" strokeWidth={2.5} />
        </div>
        Filtros
      </button>
    </ul>
  );
};

export default FiltersLine;
