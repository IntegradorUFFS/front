import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
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
  filters?: React.ReactNode[];
}

const FiltersLine: React.FC<IProps> = ({ queryKey, filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeList = useRef<HTMLUListElement>(null);

  //teste
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback((e: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef?.current?.contains(e?.target as Node) &&
      !formRef?.current?.contains(e?.target as Node)
    ) {
      popupRef.current.classList.replace("animate-menu-in", "animate-menu-out");
      popupRef.current.children[0].classList.replace(
        "animate-menu-in-content",
        "animate-menu-out-content"
      );
      setTimeout(() => setActive(false), 580);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  //-----------------------------------------------------------------------------------------//

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
      <div className="flex flex-col">
        <button
          className="py-2 font-base flex overflow-hidden gap-2 items-center w-fit max-w-full bg-zinc-200 rounded-lg px-3 justify-center"
          onClick={() => (!active ? setActive(true) : handleClose)}
        >
          <div className="relative items-center justify-center flex">
            <Scan size={20} strokeWidth={1.5} />
            <Plus size={12} className="absolute" strokeWidth={2.5} />
          </div>
          Filtros
        </button>

        {active && (
          <menu
            className="w-[300px] p-3 bg-zinc-50 absolute rounded-xl shadow-md animate-menu-in z-[5] top-[132px] border border-zinc-200 translate-y-2"
            ref={popupRef}
          >
            <div className="animate-menu-in-content flex flex-col gap-2 w-full ">
              <div className=" font-base flex overflow-hidden gap-2 items-center w-full max-w-full ">
                <div className="relative items-center justify-center flex">
                  <Scan size={20} strokeWidth={1.5} />
                  <Plus size={12} className="absolute" strokeWidth={2.5} />
                </div>

                <span className="text-center w-full text-m ">Filtros</span>
                <button
                  onClick={() => (!active ? setActive(true) : handleClose)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="h-0.5 bg-zinc-200" />
              <div>
                {filters && filters.length > 0 ? (
                  filters.map((filter, index) => (
                    <div key={index}>{filter}</div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    Nenhum filtro disponível.
                  </span>
                )}
              </div>
            </div>
          </menu>
        )}
      </div>
    </ul>
  );
};

export default FiltersLine;
