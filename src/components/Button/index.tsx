import React from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled";
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

const classes = {
  outline:
    "bg-transparent border-2 border-zinc-200 hover:border-zinc-300 disabled:opacity-60 disabled:border-zinc-300",
  filled:
    "bg-orange-600 text-white hover:opacity-90 disabled:bg-zinc-400 disabled:opacity-80",
};

const Button: React.FC<IProps> = ({
  type,
  disabled,
  onClick,
  variant = "outline",
  text,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "transition rounded-md gap-2 flex items-center justify-center font-semibold",
        classes[variant],
        icon && !text ? "p-2" : " w-full py-2 px-4",
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
