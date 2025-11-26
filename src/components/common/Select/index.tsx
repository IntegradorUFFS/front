import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import { Controller, Control } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string | number | undefined;
  }[];
  control: Control<any>;
  error?: string;
}

const Select: React.ForwardRefRenderFunction<
  HTMLButtonElement | null,
  IProps
> = ({ label, options, control, error }, ref) => {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="flex flex-col gap-2 text-sm  relative items-center w-full ">
      <div className="w-full flex flex-1 justify-center z-[5]">
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => {
            if (!value) onChange(options?.[0]?.value);
            return (
              <div className="flex flex-col gap-2 text-sm justify-center items-center  w-full">
                <span className="font-semibold w-full">{label}</span>
                <button
                  ref={ref}
                  onClick={() => setActive((prev) => !prev)}
                  className={twMerge(
                    "flex items-center w-full disabled:opacity-70 bg-zinc-200 rounded-md p-3 px-5 z-10",
                    error && "border border-red-600"
                  )}
                >
                  <div className="w-full text-start">{getLabel(value)} </div>
                  <span className="text-zinc-700 ">
                    <ChevronDown
                      size={18}
                      className={`${
                        !active ? "-" : ""
                      }rotate-180 transition-transform ease-in-out duration-200`}
                    />
                  </span>
                </button>
                {error && (
                  <span className="text-sm text-red-600 ml-2">{error}</span>
                )}
                {active && (
                  <menu
                    className="w-full py-3 px-2 bg-zinc-50 top-[5rem] absolute rounded-xl shadow-md animate-menu-in z-10"
                    ref={popupRef}
                  >
                    <div className="flex flex-col gap-1 animate-menu-in-content overflow-y-auto max-h-32 ">
                      {options?.map((option, index) => (
                        <div key={index}>
                          <button
                            key={option.value}
                            value={option.value}
                            type="button"
                            className={twMerge(
                              "py-2 flex justify-center w-full flex-col transition-opacity duration-300 px-3 rounded-md",
                              value === option.value &&
                                "bg-zinc-200 bg-opacity-70"
                            )}
                            onClick={() => onChange(option.value)}
                          >
                            <span className="text-sm">{option.label}</span>
                            {value === option.value && (
                              <div className="absolute right-4 text-zinc-700">
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
            );
          }}
        />
      </div>
    </div>
  );
};

export default forwardRef(Select);
