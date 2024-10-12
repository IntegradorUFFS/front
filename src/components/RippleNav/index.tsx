import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router-dom";
import { useMatch } from "react-router-dom";

interface IProps {
  path: string;
  text: string;
  icon: ReactNode;
}

const RippleButton: React.FC<IProps> = ({ path, text, icon, ...props }) => {
  function rippleEffect(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
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
    <NavLink
      to={path}
      onClick={(e) => {
        rippleEffect(e);
      }}
      {...props}
      className={twMerge(
        `rounded-xl my-2 px-3 h-12 w-full overflow-hidden relative bg-opacity-20 flex gap-2 items-center`,
        useMatch(path)
          ? "text-orange-600 bg-orange-300 font-semibold "
          : "text-zinc-600 bg-transparent font-semibold  "
      )}
    >
      <div className="absolute flex flex-1 gap-2 z-[2] items-center">
        {icon}
        {text}
      </div>
    </NavLink>
  );
};

export default RippleButton;
