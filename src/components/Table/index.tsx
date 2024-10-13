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
  const oauth = useAppSelector((state) => state.auth.oauth);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw Error();
      const res = await new Actions(endpoint, oauth).fetch();
      return res;
    },
  });
  const [queryState, setQueryState] = useSearchParams();

  const navigationState = useMemo(() => {
    let meta = {};
    if (data?.meta) meta = data?.meta;
    if (isLoading && meta)
      return {
        from: 0,
        to: 10,
        of: "-",
        isFirstPage: true,
        isLastPage: true,
      };
  }, [isLoading, data, queryState]);

  const handleNextPage = () => {};

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

      {isLoading
        ? Array.from(Array(10).keys())?.map((i) => (
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
            <strong className="font-medium">1-10</strong> de{" "}
            <strong className="font-medium">30</strong>
          </p>
          <div className="flex gap-1 h-full my-auto">
            <button>
              <ChevronLeft20Filled />
            </button>
            <button>
              <ChevronRight20Filled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
