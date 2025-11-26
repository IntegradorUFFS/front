import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

const classes = {
  outline:
    "bg-transparent ring-2 ring-zinc-200 hover:ring-zinc-300 disabled:opacity-60 disabled:ring-zinc-300",
  filled:
    "bg-blueRibbon-9  text-neutral-1 hover:opacity-90 disabled:bg-zinc-400 disabled:opacity-80",
};

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement | null,
  IProps
> = (
  {
    type,
    disabled,
    onClick,
    variant = "outline",
    text,
    icon,
    className,
    ...props
  },
  ref
) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        "transition rounded-lg gap-2 flex items-center justify-center h-10 text-sm",
        classes[variant],
        icon && !text ? "p-3" : " w-full py-3 px-4",
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

export default forwardRef(Button);
