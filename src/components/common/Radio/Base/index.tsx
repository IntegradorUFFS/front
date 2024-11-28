import React, { forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  items: {
    label: string;
    value: string;
  }[];
  name: string;
  label?: string;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { items, name, label, ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-1">
      {label}
      {items?.length > 0 ? (
        items?.map(({ label, value }) => (
          <label
            key={value}
            htmlFor={value}
            className="flex items-center gap-2"
          >
            <div className="grid place-items-center">
              <input
                name={name}
                type="radio"
                ref={ref}
                value={value}
                id={value}
                {...props}
                aria-label={label}
                className="col-start-1 row-start-1
        appearance-none shrink-0
        w-[1.11rem] h-[1.1rem] border-2 border-zinc-400 rounded-full peer focus:ring-1 focus:ring-orange-300 checked:border-orange-600 checked:bg-orange-600 "
              />
              <div
                className="
        col-start-1 row-start-1
        w-2 h-2 rounded-full peer-checked:bg-white"
              />
            </div>
            <span className="text-zinc-700">{label}</span>
          </label>
        ))
      ) : (
        <span className="text-zinc-600 text-sm">Nenhum item encontrado</span>
      )}
    </div>
  );
};

export default forwardRef(Radio);
