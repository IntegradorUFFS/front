import React from "react";
import Sidebar from "@/layout/Sidebar";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex flex-1 flex-row h-screen">
      <Sidebar />
      <div className="flex flex-1 py-2 bg-zinc-200 overflow-hidden">
        <main className="flex-1 pt-6 pr-6 pl-6 md:pl-0 bg-white drop-shadow-md border-solid border-2-0 border-zinc-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;
