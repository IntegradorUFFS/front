import React, { useCallback } from "react";
import { ChevronDown, Settings } from "lucide-react";
import SidebarButton from "../SidebarButton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { twMerge } from "tailwind-merge";

import NavItems from "@/routes/Admin/routes";

interface IRenderProps {
  icon: React.ReactElement;
  href: string;
  text: string;
  className?: string;
}

const renderNavButton = (i: IRenderProps, open: boolean, index: number) => {
  return (
    <SidebarButton
      openSidebar={open}
      className={i.className ?? ""}
      href={`${i.href}`}
      icon={i.icon}
      text={i.text}
      key={`${index}-${i.text}`}
    />
  );
};

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const toggleSidebar = useCallback(
    () => dispatch({ type: "layout/toggleSidebar" }),
    [dispatch]
  );

  const open = useAppSelector((state) => state.layout.sidebarActive);

  return (
    <aside
      className={twMerge(
        "px-2 py-4 pb-2 bg-surface-elevated rounded-r-2xl shadow-md flex flex-col absolute left-0 top-0 h-screen overflow-y-auto transition",
        !open ? "px-2 py-4 pb-2 items-center w-[81px]" : "w-64"
      )}
    >
      <header
        className={twMerge(
          "w-full flex justify-between items-center mb-2 h-[42px]",
          !open ? "justify-center" : ""
        )}
      >
        {open && (
          <img
            src="/logo_text.png"
            alt="Multazero logo"
            width={131}
            height={0}
            className="h-auto"
          />
        )}
        <button
          className={twMerge(
            "h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-blue-600 rotate-90 transition-transform",
            !open ? "-rotate-90" : ""
          )}
          onClick={toggleSidebar}
        >
          <ChevronDown strokeWidth={1} size={18} />
        </button>
      </header>
      <nav className="flex-1">
        {NavItems &&
          NavItems?.filter((i) => !i.disabled)?.map((i, index) => {
            if (i.type === "direct") {
              return renderNavButton(i, open, index);
            } else {
              return (
                <section className="mt-2" key={`${index}-${i.text}`}>
                  <span
                    className={twMerge(
                      "mb-2 uppercase text-xs text-zinc-600",
                      !open ? "text-center w-full flex justify-center" : ""
                    )}
                  >
                    {i.text}
                  </span>
                  {i.items &&
                    i.items
                      ?.filter((i_b) => !i_b.disabled)
                      ?.map((i_data, i_index) =>
                        renderNavButton(
                          { ...i_data, href: `${i.baseUrl}${i_data.href}` },
                          open,
                          i_index
                        )
                      )}
                </section>
              );
            }
          })}
      </nav>

      <footer>
        <hr className="mb-2" />
        <SidebarButton
          href="/settings"
          openSidebar={open}
          icon={<Settings />}
          text="Configurações"
        />
      </footer>
    </aside>
  );
};

export default Sidebar;
