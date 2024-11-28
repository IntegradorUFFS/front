import React, { forwardRef } from "react";
import Text from "./Text";
import Password from "./Password";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  toggleOpacity?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  qtd?: number;
  realNum?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  {
    error,
    label,
    placeholder,
    type = "text",
    disabled,
    qtd,
    realNum,
    onChange,
    ...props
  },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 text-sm font-sans w-full">
      <div className="grid grid-cols-3 justify-between">
        {label && <span className="font-semibold col-span-2">{label}</span>}
        {type == "quantity" && (
          <span className="font-semibold text-center">Disponível</span>
        )}
      </div>
      {type === "password" ? (
        <Password
          placeholder={placeholder}
          disabled={disabled}
          {...props}
          ref={ref}
          invalid={!!error}
          onChange={onChange}
          autoComplete="off"
        />
      ) : type === "quantity" ? (
        <div className="w-full bg-zinc-200 rounded-md grid grid-cols-3">
          <input
            type="number"
            className={twMerge(
              "w-full bg-zinc-200 rounded-md text-sm py-3 px-5 placeholder:text-zinc-500 bg-transparent aria-invalid:border-red-600 font-normal col-span-2",
              error && "border border-red-600 focus:outline-red-500"
            )}
            {...props}
            ref={ref}
            min={0}
            max={qtd}
            autoComplete="off"
          ></input>

          <span className="bg-zinc-300 rounded-md py-3 w-full text-sm font-normal text-center ">
            {qtd}
          </span>
        </div>
      ) : (
        <Text
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...props}
          ref={ref}
          realNum={realNum}
          invalid={!!error}
          onChange={onChange}
          autoComplete="off"
        />
      )}
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
