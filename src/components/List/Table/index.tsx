import React, { useMemo, useCallback, useEffect } from "react";
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
import { twMerge } from "tailwind-merge";

interface IProps {
  fields: {
    title: string;
    keys: string | string[];
    isSortable?: boolean;
    transform?: (item: any, row: Record<string, any>) => any;
  }[];
  onEdit?: (params?: any) => void;
  onDelete?: false | ((data: any, callback: () => void) => void);
  queryKey: string[];
  endpoint: string;
  titleEdit?: string;
  formEdit?: React.ReactNode;
  rowValidation?: (params?: any) => boolean;
}

const Table: React.FC<IProps> = ({
  fields,
  onDelete,
  onEdit,
  queryKey,
  endpoint,
  titleEdit,
  formEdit,
  rowValidation,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const buttons = useMemo(() => {
    const buttons = [];
    if (onEdit) buttons.push("edit");
    if (onDelete) buttons.push("delete");
    let sum = buttons.length * 18;
    buttons.forEach((_, i, arr) => {
      if (arr[i + 1]) sum += 12;
    });
    return sum;
  }, [onDelete, onEdit]);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  const oauth = useAppSelector((state) => state.auth.oauth);
  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw Error();

      const params: {
        page?: number;
        per_page?: number;
        sort_column?: string;
        sort_direction?: string;
      } = {
        page: 0,
        per_page: undefined,
      };

      if (searchParams.get("sort_column") !== null) {
        params.sort_column = searchParams.get("sort_column")!;
      }

      if (searchParams.get("sort_direction") !== null) {
        params.sort_direction = searchParams.get("sort_direction")!;
      }

      if (searchParams.get("page")) {
        const page = Number(searchParams.get("page"));
        if (meta?.total_pages && page < meta?.total_pages)
          params.page = Number(searchParams.get("page"));
      }

      if (searchParams.get("per_page")) {
        params.per_page = Number(searchParams.get("per_page"));
      }

      const filters: Record<string, any> = {};

      for (const [key] of searchParams.entries()) {
        if (key.startsWith("filter")) {
          const name = key.replace("]", "").split("[")[1];

          let value = decodeURI(searchParams.get(key) ?? "");
          try {
            value = JSON.parse(value);
          } catch {
            /* empty */
          }
          filters[name] = value;
        }
      }

      const res = await new Actions(endpoint, oauth).fetch({
        ...params,
        filters,
      });
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: res.meta.page,
        per_page: res.meta.per_page,
      });

      if (params.page && params.page >= res?.meta?.total_pages) {
        searchParams.set("page", String(res?.meta?.total_pages - 1));
        setSearchParams(searchParams);
        queryClient.invalidateQueries({ queryKey });
      }
      return res;
    },
  });

  const meta = data?.meta;

  const sortState = useMemo(() => {
    const column = searchParams.get("sort_column");
    const direction = searchParams.get("sort_direction");
    return {
      column,
      direction,
    };
  }, [searchParams]);

  const handlePrevPage = useCallback(() => {
    searchParams.set("page", String(meta?.page - 1));
    setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey });
  }, [meta, setSearchParams, searchParams, queryKey, queryClient]);

  const handleNextPage = useCallback(() => {
    searchParams.set("page", meta?.page + 1);
    setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey });
  }, [meta, setSearchParams, searchParams, queryKey, queryClient]);

  const getLoadingSize = () => {
    if (!searchParams.get("per_page")) return 10;

    let page: number | string = searchParams.get("page") || "0";
    let per_page: number | string = searchParams.get("per_page") || "0";
    page = Number(page);
    per_page = Number(per_page);

    const inPage = (page + 1) * per_page;
    const prevPage = page * per_page;

    if (inPage > meta?.total) return meta?.total - prevPage;
    return per_page;
  };

  const isActive = (keys: string | string[]) => {
    if (typeof keys === "string") {
      return keys === sortState.column;
    }

    return keys.join(".") === sortState.column;
  };

  const handleSort = (keys: string | string[]) => {
    if (isActive(keys)) {
      searchParams.set(
        "sort_direction",
        sortState.direction === "asc" ? "desc" : "asc"
      );
    } else {
      if (typeof keys === "string") searchParams.set("sort_column", keys);
      else searchParams.set("sort_column", keys.join("."));

      searchParams.set("sort_direction", "asc");
    }
    setSearchParams(searchParams);
    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div className="flex-1">
      <DynamicGrid
        $buttons={buttons}
        className="bg-zinc-200 rounded-xl grid py-2 px-3 text-base font-montserrat"
        $length={fields.length}
      >
        {fields?.map(({ title, keys, isSortable }) =>
          isSortable ? (
            <button
              onClick={() => handleSort(keys)}
              type="button"
              key={title}
              className="flex items-center justify-start gap-2"
              disabled={isFetching}
            >
              {title}{" "}
              <span
                className={twMerge(
                  "opacity-0 rotate-90 transition-transform",
                  isActive(keys) && "opacity-50",
                  sortState.direction === "asc" && "-rotate-90"
                )}
              >
                <ChevronRight20Filled />
              </span>
            </button>
          ) : (
            <div key={title}>{title}</div>
          )
        )}
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
              buttons={buttons}
              title={titleEdit}
              form={formEdit}
              rowValidation={rowValidation}
            />
          ))}

      <div dir="rtl">
        <div
          dir="ltr"
          className="bg-zinc-200 rounded-xl py-2 px-4 text-base font-montserrat w-40 flex justify-between mt-2 items-center leading-none"
        >
          <p>
            {!meta?.total_pages ? (
              <strong className="font-medium">~</strong>
            ) : (
              <strong className="font-medium">
                {Number(searchParams.get("page")) + 1}
              </strong>
            )}{" "}
            de{" "}
            <strong className="font-medium">{meta?.total_pages ?? "~"}</strong>
          </p>
          <div className="flex gap-1 h-full my-auto">
            <button
              disabled={
                Number(searchParams.get("page")) <= 0 || !meta?.total_pages
              }
              type="button"
              className="disabled:opacity-30"
              onClick={handlePrevPage}
            >
              <ChevronLeft20Filled />
            </button>
            <button
              disabled={
                Number(searchParams.get("page")) >= meta?.total_pages - 1 ||
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
