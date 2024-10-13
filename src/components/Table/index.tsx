import React, { useMemo, useCallback } from "react";
import {
  ChevronLeft20Filled,
  ChevronRight20Filled,
} from "@fluentui/react-icons";
import { useSearchParams } from "react-router-dom";
import TableRow from "./Row";
import { DynamicGrid } from "./styles";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
  }[];
  onEdit?: (params?: any) => void;
  onDelete?: (params?: any) => void;
  queryKey: string[];
  endpoint: string;
}

const Table: React.FC<IProps> = ({
  fields,
  onDelete,
  onEdit,
  queryKey,
  endpoint,
}) => {
  const [queryState, setQueryState] = useSearchParams();

  const queryClient = useQueryClient();

  const oauth = useAppSelector((state) => state.auth.oauth);
  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw Error();

      const params: {
        page?: number;
        per_page?: number;
      } = {
        page: undefined,
        per_page: undefined,
      };

      if (queryState.get("page")) {
        params.page = Number(queryState.get("page"));
      }

      if (queryState.get("per_page")) {
        params.per_page = Number(queryState.get("per_page"));
      }

      const res = await new Actions(endpoint, oauth).fetch(params);
      setQueryState({
        page: res.meta.page,
        per_page: res.meta.per_page,
      });
      return res;
    },
  });

  const meta = useMemo(() => data?.meta, [data]);

  const handlePrevPage = useCallback(() => {
    queryState.set("page", String(meta?.page - 1));
    setQueryState(queryState);
    queryClient.invalidateQueries({ queryKey });
  }, [meta, setQueryState, queryState, queryKey, queryClient]);

  const handleNextPage = useCallback(() => {
    queryState.set("page", meta?.page + 1);
    setQueryState(queryState);
    queryClient.invalidateQueries({ queryKey });
  }, [meta, setQueryState, queryState, queryKey, queryClient]);

  const calculateTotalOfPage = () => {
    if (!meta) return 10;
    if (meta?.total === 0) return 0;
    const calculated =
      Number(queryState.get("page")) * Number(queryState.get("per_page")) +
      Number(queryState.get("per_page"));

    if (calculated > meta?.total) return meta?.total;
    return calculated;
  };

  const getLoadingSize = () => {
    if (!queryState.get("per_page")) return 10;

    let page: number | string = queryState.get("page") || "0";
    let per_page: number | string = queryState.get("per_page") || "0";
    page = Number(page);
    per_page = Number(per_page);

    const calculated = page * per_page + per_page;
    if (calculated > meta?.total) return meta?.total - per_page;
    return per_page;
  };

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

      {isFetching
        ? Array.from(Array(getLoadingSize()).keys())?.map((i) => (
            <div key={i} className="py-2 px-3 w-full">
              <div className="w-full h-6 rounded-md bg-zinc-100 animate-pulse" />
            </div>
          ))
        : data?.data?.map((item: Record<string, any>, i: number) => (
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
          className="bg-zinc-200 rounded-xl py-2 px-4 text-base font-montserrat w-40 flex justify-between mt-2 items-center leading-none"
        >
          <p>
            {meta?.total_pages === 0 ? (
              <strong className="font-medium">0-0</strong>
            ) : (
              <strong className="font-medium">
                {Number(queryState.get("page")) *
                  Number(queryState.get("per_page")) +
                  1}
                -{calculateTotalOfPage()}
              </strong>
            )}{" "}
            de <strong className="font-medium">{meta?.total ?? "~"}</strong>
          </p>
          <div className="flex gap-1 h-full my-auto">
            <button
              disabled={queryState.get("page") === "0" || !meta?.total_pages}
              type="button"
              className="disabled:opacity-30"
              onClick={handlePrevPage}
            >
              <ChevronLeft20Filled />
            </button>
            <button
              disabled={
                Number(queryState.get("page")) === meta?.total_pages - 1 ||
                !meta?.total_pages
              }
              type="button"
              className="disabled:opacity-30"
              onClick={handleNextPage}
            >
              <ChevronRight20Filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
