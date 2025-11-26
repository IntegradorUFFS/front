import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  toggleOpacity?: boolean;
  invalid?: boolean;
  realNum?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  {
    placeholder,
    type,
    disabled,
    toggleOpacity = true,
    realNum,
    invalid,
    ...props
  },
  ref
) => {
  return (
    <input
      className={twMerge(
        "h-10 px-3 rounded-md border w-full text-sm placeholder:text-zinc-500 bg-transparent aria-invalid:border-red-600 font-normal",
        toggleOpacity && "disabled:opacity-70",
        invalid && "border border-red-600 focus:outline-red-500"
      )}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      {...props}
      ref={ref}
      min={realNum ? 0 : undefined}
    />
  );
};

export default forwardRef(Input);
