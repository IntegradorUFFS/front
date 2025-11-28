import React from "react";
import { User, ChevronDown, Settings, LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu: React.FC = () => {
  const user = useAppSelector(({ auth }) => auth.user);
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex justify-center items-center gap-3 rounded-md hover:bg-black hover:bg-opacity-[0.02] p-1 transition-colors">
          <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-neutral-3">
            {!user.picture ? (
              <User />
            ) : (
              <img className="w-10 h-10" alt="user image" src={user.picture} />
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center items-start gap-1.5 ">
            <h5 className="leading-none font-semibold">{user.name}</h5>
            <span className="leading-none text-sm text-neutral-5">
              {user?.tenant ?? "Multazero"}
            </span>
          </div>
          <div className="group-hover:animate-bounce text-neutral-7 h-10 w-9 flex items-center justify-center">
            <ChevronDown size={18} />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex items-center justify-between cursor-pointer w-full">
              Minha conta
              <User size={14} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center justify-between cursor-pointer w-full">
              Configurações
              <Settings size={14} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch({ type: "auth/signOut" })}>
          <div className="flex items-center justify-between cursor-pointer w-full">
            Sair
            <LogOut size={14} />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
