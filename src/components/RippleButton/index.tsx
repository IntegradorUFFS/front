import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  icon: ReactNode;
  active?: boolean;
}

const RippleButton: React.FC<IProps> = ({
  onClick,
  text,
  icon,
  active,
  ...props
}) => {
  function rippleEffect(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");
    circle.classList.add("scale-0");
    circle.classList.add("absolute");
    circle.classList.add("rounded-full");
    circle.classList.add("bg-orange-300");
    circle.classList.add("animate-ripple");
    circle.classList.add("z-0");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  }

  return (
    <button
      onClick={(e) => {
        rippleEffect(e);
        onClick(e);
      }}
      {...props}
      type="button"
      className={twMerge(
        `rounded-xl my-2 px-3 h-12 w-full overflow-hidden relative bg-opacity-20 flex gap-2 items-center`,
        active
          ? "text-orange-600 bg-orange-300 font-normal"
          : "text-zinc-900 bg-transparent font-light"
      )}
    >
      <div className="absolute flex flex-1 gap-2 z-[2] items-center">
        {icon}
        <div className="font-bold">{text}</div>
      </div>
    </button>
  );
};

export default RippleButton;
