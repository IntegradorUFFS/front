import React, { memo } from "react";
import UserMenu from "@/components/UserMenu";
import RippleButton from "@/components/RippleNav";
import routes from "@/routes/Admin/routes";
import { useAppSelector } from "@/hooks";

const Sidebar: React.FC = () => {
  const { user, permissions } = useAppSelector(({ auth }) => auth);
  return (
    <aside className=" bg-zinc-200 py-2 flex overflow-hidden">
      <div className=" py-2 bg-zinc-200 min-w-72 max-w-86 w-full h-screen px-2 flex flex-col">
        <div className="w-full flex justify-center">
          <img className="h-10 mb-6" src="/images/logo_text.png" alt="" />
        </div>

        <UserMenu user={user} />
        {routes
          .filter(({ scope }) => permissions && permissions.includes(scope))
          .map((route) => (
            <RippleButton
              key={route.name}
              path={route.path}
              text={route.name}
              icon={route.icon}
            />
          ))}
      </div>
      <div className="ml-4 h-full w-6 bg-white rounded-l-xl border-solid border-l-2 border-zinc-200 drop-shadow-md" />
    </aside>
  );
};
export default memo(Sidebar);
