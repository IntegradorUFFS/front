import React from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  variant: "outline" | "filled";
  disabled: boolean;
}

const classes = {
  outline: "bg-transparent border-2 border-zinc-200 focus:border-zinc-400",
  filled: "bg-zinc-200",
};

const Input: React.FC<IProps> = ({
  label,
  placeholder,
  type,
  variant,
  disabled,
  value,
  onChange,

  ...props
}) => {
  console.log(label, placeholder, type, variant, disabled, props);
  if (label)
    return (
      <>
        {label}
        <input
          className={twMerge("w-full", classes[variant])}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />
      </>
    );
  return (
    <input
      className={twMerge("w-full", classes[variant])}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
