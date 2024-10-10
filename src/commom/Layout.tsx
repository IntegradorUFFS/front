import React from "react";
import Sidebar from "@/commom/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-row ">
      <Sidebar />
      <div className="flex flex-1 py-2 bg-zinc-200 overflow-hidden">
        <main className="flex-1 p-6 bg-white drop-shadow-md border-solid border-2-0 border-zinc-200">
          {children}
        </main>
      </div>
    </div>
  );
};
export default Layout;
