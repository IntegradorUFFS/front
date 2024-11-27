import React, { useState, useCallback, useEffect, useRef } from "react";
import Input from "../Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { useForm, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const schema = z.object({
  query: z.string(),
});

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  endpoint: string;
  queryKey: string[];
  getOptionLabel: (option: any) => string;
  valueKey?: string;
  control: Control<any>;
  name: string;
  disabled?: boolean;
  extraFilter?: Record<string, any>;
}

const Autocomplete: React.FC<IProps> = ({
  label,
  placeholder,
  queryKey,
  endpoint,
  getOptionLabel,
  valueKey,
  name,
  control,
  disabled,
  extraFilter,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);

  const queryClient = useQueryClient();

  const { register, getValues, watch, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      search: "",
    },
  });

  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const search = getValues("search");
      const res = await new Actions(endpoint, oauth).autocomplete(
        search,
        undefined,
        true,
        extraFilter
      );
      return res.data;
    },
  });

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

  const search = watch("search");

  useEffect(() => {
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, queryClient, queryKey]);

  const [selected, setSelected] = useState("");

  const getRecord = async (
    value: string | number,
    onChange: (value: any) => void
  ) => {
    let record = data?.find(
      (item: Record<string, any>) =>
        (valueKey ? item?.[valueKey] : item?.id) === value
    );

    if (!record) {
      const res = await new Actions(endpoint, oauth).autocomplete(
        "",
        String(value)
      );

      if (res.data?.length > 0) {
        record = res.data[0];
      }
    }

    if (!record) {
      setSelected("");
      onChange(undefined);
    }

    setSelected(getOptionLabel(record));
  };

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="flex flex-col gap-2 text-sm font-sans relative items-center w-full">
            <div className="w-full flex flex-1 justify-start z-[5]">
              {!value ? (
                <Input
                  label={label}
                  placeholder={placeholder}
                  onClick={() => setActive(true)}
                  {...register("search")}
                  autoComplete="off"
                  error={error?.message}
                />
              ) : (
                <div
                  className="flex flex-col gap-2 text-sm font-sans w-full"
                  {...getRecord(value, onChange)}
                >
                  {label && <span className="font-semibold">{label}</span>}
                  <div className="w-full bg-zinc-200 rounded-md text-sm py-3 px-5 placeholder:text-zinc-500 bg-transparent aria-invalid:border-red-600 font-normal flex justify-between">
                    {selected}
                    <button
                      type="button"
                      className="h-full flex items-center justify-center"
                      onClick={() => {
                        setValue("search", "");
                        onChange(null);
                        setSelected("");
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {error?.message && (
                    <span className="text-sm text-red-600 ml-2">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            </div>

            {active && (
              <menu
                className="w-full p-3 bg-zinc-50 top-[5rem] absolute rounded-xl shadow-md animate-menu-in z-10"
                ref={popupRef}
              >
                <div className="flex flex-col gap-1 animate-menu-in-content overflow-y-auto max-h-32">
                  {data && data?.length > 0 ? (
                    data?.map(
                      (
                        item: Record<string, any>,
                        index: number,
                        arr: Record<string, any>[]
                      ) => (
                        <div key={item?.id}>
                          <button
                            className={twMerge(
                              "py-2 flex justify-center w-full flex-col transition-opacity duration-300",
                              isFetching && "opacity-30"
                            )}
                            onClick={() => {
                              onChange(valueKey ? item?.[valueKey] : item?.id);
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
                            <span className="text-sm">
                              {getOptionLabel(item)}
                            </span>
                          </button>
                          {arr[index + 1] && (
                            <hr className="border-zinc-300 w-full" />
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <span className="text-zinc-500">
                      Nenhum item encontrado
                    </span>
                  )}
                </div>
              </menu>
            )}
          </div>
        );
      }}
    />
  );
};

export default Autocomplete;
