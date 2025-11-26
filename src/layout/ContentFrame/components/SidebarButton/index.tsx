import React from "react";
import { twMerge } from "tailwind-merge";
import { NavLink } from "react-router-dom";
import { useMatch } from "react-router-dom";

interface IProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  openSidebar: boolean;
}

const SidebarButton: React.FC<IProps> = ({
  href,
  text,
  icon,
  className,
  openSidebar,
}) => {
  return (
    <NavLink
      to={href}
      className={twMerge(
        useMatch(href) ? "text-blueRibbon-7 bg-blueRibbon-2" : "",
        "w-full flex gap-3 rounded-2xl h-14 py-4 px-3 transition-colors",
        !openSidebar ? "items-center justify-center" : ""
      )}
    >
      {icon}
      {openSidebar && <span className={className}>{text}</span>}
    </NavLink>
  );
};

export default SidebarButton;
