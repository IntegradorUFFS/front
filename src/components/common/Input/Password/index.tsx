import React, { useState, forwardRef } from "react";
import Input from "../Text";
import { Eye16Filled, EyeOff16Filled } from "@fluentui/react-icons";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
}

const InputPassword: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  IProps
> = ({ placeholder, disabled, value, invalid, ...props }, ref) => {
  const [inputType, setInputType] = useState<string>("password");
  return (
    <div
      className={twMerge(
        "w-full bg-zinc-200 rounded-md overflow-hidden flex items-center justify-center outline-blue-700 focus-within:outline focus-within:outline-2",
        disabled && "opacity-70",
        invalid &&
          "border border-red-600 outline-red-500 focus-within:outline-1"
      )}
    >
      <Input
        className="flex-1 py-3 px-5 bg-transparent outline-none"
        placeholder={placeholder}
        type={inputType}
        disabled={disabled}
        toggleOpacity={false}
        {...props}
        ref={ref}
      />

      <button
        className="px-5 py-3 h-full"
        type="button"
        onClick={() =>
          setInputType((prev) => (prev === "password" ? "text" : "password"))
        }
      >
        {inputType === "password" ? <EyeOff16Filled /> : <Eye16Filled />}
      </button>
    </div>
  );
};

export default forwardRef(InputPassword);
