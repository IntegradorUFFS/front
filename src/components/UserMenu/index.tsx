import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, DoorOpen, DoorClosed, Bolt } from "lucide-react";

interface IProps {
  first_name: string;
  last_name: string;
  email: string;
}

const UserMenu: React.FC<IProps> = ({ email, first_name, last_name }) => {
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);

  const handleClose = useCallback((e: MouseEvent) => {
    if (popupRef.current && !popupRef?.current?.contains(e?.target as Node)) {
      popupRef.current.classList.replace("animate-menu-in", "animate-menu-out");
      popupRef.current.children[0].classList.replace(
        "animate-menu-in-content",
        "animate-menu-out-content"
      );
      setTimeout(() => setActive(false), 580);
    }
  }, []);

  const handleToggleDoor = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.children[0].classList.toggle("hidden");
      e.currentTarget.children[1].classList.toggle("hidden");
    },
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <>
      <li className="list-none relative flex justify-center">
        <button
          onClick={() => (!active ? setActive(true) : handleClose)}
          className="z-10 w-full bg-zinc-50 p-3 rounded-xl list-none border border-zinc-300 flex gap-2 select-none text-left items-center"
        >
          <div className="h-10 w-10 font-semibold border border-zinc-200 bg-indigo-400 rounded-full text-center text-zinc-50 items-center justify-center flex text-base">
            {first_name?.[0]?.toUpperCase()}
            {last_name?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-bold">
              {first_name} {last_name}
            </h2>
            <p className="text-xs opacity-60 font-bold">{email}</p>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <ChevronDown
              size={18}
              className={`${
                !active ? "-" : ""
              }rotate-180 transition-transform ease-in-out duration-200`}
            />
          </div>
        </button>
        {active && (
          <menu
            className="w-full p-3 bg-zinc-50 top-[4.5rem] absolute rounded-xl shadow-md animate-menu-in z-[5]"
            ref={popupRef}
          >
            <div className="animate-menu-in-content">
              <button className="py-2 flex items-center w-full group">
                <Bolt
                  className="opacity-65 mr-2 group-hover:animate-spin-slow"
                  size={18}
                />
                <span className="text-sm">Atualizar perfil</span>
              </button>
              <hr className="border-zinc-300" />
              <button
                className="py-2 flex items-center w-full"
                onMouseEnter={handleToggleDoor}
                onMouseLeave={handleToggleDoor}
              >
                <DoorOpen className="opacity-65 mr-2 hidden" size={18} />
                <DoorClosed className="opacity-65 mr-2" size={18} />
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </menu>
        )}
      </li>
    </>
  );
};

export default UserMenu;
