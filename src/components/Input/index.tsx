import React, { useState, forwardRef } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  // variant: "outline" | "filled";
  value: string | number;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

// const classes = {
//   outline: "bg-transparent border-2 border-zinc-200 focus:border-zinc-400",
//   filled: "bg-zinc-200",
// };

// className={twMerge("w-full", classes[variant])}

const Input: React.ForwardRefRenderFunction<unknown, IProps> = (
  {
    label,
    placeholder,
    type,
    disabled,
    value,
    onChange,

    ...props
  },
  ref
) => {
  console.log(label, placeholder, type, disabled, props);
  const [inputType, setInputType] = useState<string>(type ?? "text");
  return (
    <div
      className={`w-full bg-zinc-200 rounded-md overflow-hidden flex items-center justify-center ${
        disabled && "opacity-70"
      }`}
    >
      <input
        className="flex-1 text-sm py-3 px-5 placeholder:text-zinc-500 bg-transparent"
        placeholder={placeholder}
        type={inputType}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
        ref={ref}
      />
      {type === "password" && (
        <button
          className="px-5 py-3 h-full"
          onClick={() =>
            setInputType((prev) => (prev === "password" ? "text" : "password"))
          }
        >
          {inputType === "password" ? (
            <EyeOffIcon size={15} />
          ) : (
            <EyeIcon size={15} />
          )}
        </button>
      )}
    </div>
  );
};

export default forwardRef(Input);
