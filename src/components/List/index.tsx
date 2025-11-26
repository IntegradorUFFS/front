import React from "react";
import { twMerge } from "tailwind-merge";

interface ICComponent<T = any> {
  type: "component";
  component: React.FC<T>;
  label: string;
  width?: number | string;
}

interface ICData {
  type: "string" | "number" | "date";
  label: string;
  keys: string[];
  formatter?: (data: any) => string | number;
  width?: number | string;
}

export type TColumns = ICData | ICComponent;

interface IProps {
  columns: TColumns[];
  data: Record<string, any>[];
  attrKey: string[];
}

const index: React.FC<IProps> = ({ data, columns, attrKey }) => {
  const fillWidth = (col: TColumns) => {
    let width = "1fr";

    if (col?.width) {
      if (typeof col?.width === "number") width = `${col?.width}px`;
      else width = col?.width;
    }

    return { ...col, width };
  };

  columns = columns.map((col) => fillWidth(col));

  const sumWidth = columns.map((col) => col.width).join(" ");

  const accessValue = (keys: string[], record: Record<string, any>) => {
    let curr = record;
    for (const key of keys) {
      curr = curr[key];
    }

    if (typeof curr === "number" || typeof curr === "string") return curr;
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: sumWidth }}>
      {columns &&
        columns.map((col) => (
          <div
            key={col.label}
            className=" px-4 py-3 flex items-center justify-start text-left text-neutral-6 text-xs"
          >
            {col.label}
          </div>
        ))}
      {data?.map((record, rI) =>
        columns.map((col, colI) => {
          if (col.type === "component")
            return (
              <div
                key={`data-${rI}-${colI}`}
                className={twMerge(
                  "text-sm text-neutral-8 px-4 py-3",
                  rI % 2 === 0 && "bg-neutral-1"
                )}
              >
                {col.component({ ...record })}
              </div>
            );

          const value = col.formatter
            ? col.formatter(accessValue(col.keys, record))
            : accessValue(col.keys, record);

          return (
            <div
              key={`data-${rI}-${colI}`}
              className={twMerge(
                "text-sm text-neutral-8 px-4 py-3 truncate align-middle tracking-wide leading-5 ",
                rI % 2 === 0 && "bg-neutral-1",
                colI === 0 && 'rounded-l-2xl'
              )}
              title={String(value)}
            >
              {value}
            </div>
          );
        })
      )}
    </div>
  );
};

export default index;
