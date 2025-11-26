import React from "react";
import { Outlet } from "react-router-dom";
import ContentFrame from "./ContentFrame";


interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <ContentFrame>
      <div className="flex flex-col h-full font-aileron">
        <Outlet />
      </div>
    </ContentFrame>
  );
};
export default Layout;
