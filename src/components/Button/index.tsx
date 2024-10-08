import React from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "outline" | "filled";
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const classes = {
  outline: "bg-transparent border-2 border-zinc-200 focus:border-zinc-400",
  filled: "bg-zinc-200",
};


const Button: React.FC<IProps> = ({
  type,
  disabled,
  value,
  onChange,
  variant,

  ...props
}) => {
  console.log(type, disabled, props);
  return (
    <button
    className={twMerge("w-full", classes[variant])}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Button;
