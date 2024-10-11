import React from "react";
import UserMenu from "@/components/UserMenu";
import RippleButton from "@/components/RippleButton";
import routes from "@/routes/Admin/routes";

const Sidebar: React.FC = () => {
  return (
    <aside className=" bg-zinc-200 py-2 flex overflow-hidden">
      <div className=" py-2 bg-zinc-200 min-w-72 max-w-86 w-full h-screen px-2 flex flex-col">
        <img className="h-10 mb-6" src="/images/logo_text.svg" alt="" />
        <UserMenu
          first_name="Conta"
          last_name="Teste"
          email="tetse@gmail.com"
        />
        {routes.map((route) => (
          <RippleButton
            key={route.name}
            onClick={console.log}
            text={route.name}
            icon={route.icon}
          />
        ))}
      </div>
      <div className="ml-4 h-full w-6 bg-white rounded-l-xl border-solid border-l-2 border-zinc-200 drop-shadow-md" />
    </aside>
  );
};
export default Sidebar;
