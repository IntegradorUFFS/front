import React, { useState, forwardRef } from "react";
import Input from "../Text";
import { Eye16Filled, EyeOff16Filled } from "@fluentui/react-icons";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputPassword: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  IProps
> = ({ placeholder, disabled, ...props }, ref) => {
  const [inputType, setInputType] = useState<string>("password");
  return (
    <div
      className={twMerge(
        "w-full bg-zinc-200 rounded-md overflow-hidden flex items-center justify-center",
        disabled && "opacity-70"
      )}
    >
      <Input
        className="flex-1 text-sm py-3 px-5 placeholder:text-zinc-500 bg-transparent"
        placeholder={placeholder}
        type={inputType}
        disabled={disabled}
        toggleOpacity={false}
        {...props}
        ref={ref}
      />

      <button
        className="px-5 py-3 h-full"
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
