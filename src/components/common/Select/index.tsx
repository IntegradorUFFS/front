import React, { useState, useCallback, useEffect, useRef } from "react";
import { Controller, Control } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

interface IProps {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string | number | undefined;
  }[];

  control: Control<any>;
}
const Select: React.FC<IProps> = ({ label, options, control }) => {
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);

  const getLabel = (value: string | number | undefined) => {
    if (!value) return options?.[0]?.label ?? "";
    const option = options.find((option) => option.value === value);
    return option ? option.label : "";
  };

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

  //descer e subir no scroll
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="flex flex-col gap-2 text-sm font-sans relative items-center w-full ">
      <div className="w-full flex flex-1 justify-center z-[5]">
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-2 text-sm font-sans w-full">
              <span className="font-semibold">{label}</span>
              {getLabel(value)}{" "}
              <span className="text-zinc-400">
                <ChevronDown size={14} strokeWidth={3} />
              </span>
              {active && (
                <menu
                  className="w-full p-3 bg-zinc-50 top-[5rem] absolute rounded-xl shadow-md animate-menu-in z-10"
                  ref={popupRef}
                >
                  <div className="flex flex-col gap-1 animate-menu-in-content overflow-y-auto max-h-32 ">
                    {options?.map((option) => (
                      <div>
                        <button
                          key={option.value}
                          value={option.value}
                          type="button"
                          className={
                            "py-2 flex justify-center w-full flex-col transition-opacity duration-300"
                          }
                          onClick={() => {
                            onChange(option.value);
                            if (popupRef.current) {
                              popupRef.current.classList.replace(
                                "animate-menu-in",
                                "animate-menu-out"
                              );
                              popupRef.current.children[0].classList.replace(
                                "animate-menu-in-content",
                                "animate-menu-out-content"
                              );
                            }
                            setTimeout(() => setActive(false), 580);
                          }}
                        >
                          <span className="text-sm">{option.label}</span>
                          {getLabel(value) === option.label && (
                      <div className="absolute left-1 text-zinc-400">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                        </button>
                      </div>
                    ))}
                  </div>
                </menu>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Select;
