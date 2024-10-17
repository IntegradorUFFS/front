import React, { forwardRef } from "react";
import Input from "../Input";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  //label: string;
  //placeholder: string;
}

let option: string;

const Dataset: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  IProps
> = ({}) => {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="flex flex-col gap-2 text-sm font-sans relative">
      <span className="font-semibold">Categoria</span>
      <button
        onClick={() => {
          !active ? setActive(true) : handleClose;
        }}
        className="w-full bg-zinc-200 rounded-md text-sm py-3 px-5 placeholder:text-zinc-500 bg-transparent aria-invalid:border-red-600 font-normal text-left"
      >
        {option ? option : "Selecione uma categoria"}
      </button>

      {active && (
        <menu
          className="w-full p-3 bg-zinc-50 top-[4.5rem] absolute rounded-xl shadow-md animate-menu-in z-[5]"
          ref={popupRef}
        >
          <div className="flex flex-col gap-1">
            <button onClick={() => (option = "1")}>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </menu>
      )}
    </div>
  );
};

export default forwardRef(Dataset);
