import React, { useCallback, useRef, useMemo } from "react";
import { X, Scan, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  possibleFilters: {
    type: string;
    description: string;
    autocomplete_endpoint?: string;
  }[];
  queryKey: string[];
}

const FiltersLine: React.FC<IProps> = ({ queryKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeList = useRef<HTMLUListElement>(null);

  const queryClient = useQueryClient();

  const removeFilter = useCallback(
    (filter: string, index: number) => {
      if (activeList?.current) {
        activeList.current.children[index].classList.replace(
          "animate-width-fit",
          "animate-width-0"
        );
        setTimeout(() => {
          const prev = { ...Object.fromEntries(searchParams) };
          delete prev[filter];
          setSearchParams(prev);
          queryClient.invalidateQueries({ queryKey });
        }, 300);
      }
    },
    [activeList, searchParams, setSearchParams, queryClient, queryKey]
  );

  const activeFilters = useMemo(() => {
    const res: {
      key: string;
      value: string | null | { text: string; value: string };
    }[] = [];

    for (const key of searchParams.keys()) {
      if (key.startsWith("filter")) {
        let value = decodeURI(searchParams.get(key) ?? "");
        try {
          value = JSON.parse(value);
        } catch {
          /* empty */
        }
        res.push({ key, value: value });
      }
    }
    return res;
  }, [searchParams]);
  return (
    <ul
      className="flex gap-2 items-center flex-1 flex-wrap pt-1 pb-3"
      ref={activeList}
    >
      {activeFilters?.length > 0 &&
        activeFilters?.map((appliedFilter, i) => (
          <li
            className="list-none flex rounded-lg overflow-hidden animate-width-fit px-3 bg-zinc-100"
            key={appliedFilter.key}
          >
            <button
              className="py-2 font-base flex overflow-hidden gap-2 items-center w-fit max-w-full"
              onClick={() => removeFilter(appliedFilter.key, i)}
            >
              {typeof appliedFilter.value === "object" &&
              appliedFilter.value !== null
                ? appliedFilter.value.text
                : appliedFilter.value}
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
