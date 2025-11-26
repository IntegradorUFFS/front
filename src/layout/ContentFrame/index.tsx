import React from "react";
import { twMerge } from "tailwind-merge";
import Sidebar from "./components/Siderbar";
import { useAppSelector } from "@/hooks";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const ContentFrame: React.FC<IProps> = ({ children, className }) => {
  const sidebarActive = useAppSelector((state) => state.layout.sidebarActive);
  const breadcrumb = useAppSelector((state) => state.layout.breadcrumb);
  return (
    <div
      className={twMerge(
        className,
        "antialiased scroll-smooth bg-neutral-1 h-screen grid text-zinc-800 transition-all  relative",
        sidebarActive ? "pl-64" : "pl-[81px]"
      )}
    >
      <Sidebar />
      <div
        className={twMerge(
          "grid grid-rows-[96px_auto] h-screen",
          !breadcrumb && "grid-rows-1"
        )}
      >
        {breadcrumb && (
          <header
            className="flex px-6 items-center justify-between w-full h-24
        "
          >
            <h1 className="text-3xl text-slate-800 gap-2 flex items-center justify-start">
              {breadcrumb}
            </h1>
          </header>
        )}
        <main
          className={twMerge(
            "overflow-x-auto h-full overflow-auto",
            !breadcrumb && "h-screen"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default ContentFrame;
