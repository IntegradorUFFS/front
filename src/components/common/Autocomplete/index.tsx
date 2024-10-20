import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Input from "../Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  query: z.string(),
});

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  endpoint: string;
  queryKey: string[];
  getOptionLabel: (option: any) => string;
  getOptionValue?: (option: any) => any;
  control: typeof Controller;
}

const Dataset: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  IProps
> = ({
  label,
  placeholder,
  queryKey,
  endpoint,
  getOptionLabel,
  getOptionValue,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);

  const queryClient = useQueryClient();

  const { register, getValues, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      search: "",
    },
  });

  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const search = getValues("search");
      console.log({ search });
      const res = await new Actions(endpoint, oauth).autocomplete(search);
      return res.data;
    },
  });

  console.log(data);

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
    queryClient.invalidateQueries({ queryKey });
  }, [search, queryClient]);

  return (
    <div className="flex flex-col gap-2 text-sm font-sans relative items-center w-full">
      <div className="w-full flex flex-1 justify-start z-10">
        <Input
          label={label}
          placeholder={placeholder}
          onClick={() => {
            !active ? setActive(true) : handleClose;
          }}
          {...register("search")}
        />
      </div>

      {active && (
        <menu
          className="w-full p-3 bg-zinc-50 top-[5rem] absolute rounded-xl shadow-md animate-menu-in z-[5]"
          ref={popupRef}
        >
          <div className="flex flex-col gap-1 animate-menu-in-content overflow-y-auto max-h-32">
            {data?.map(
              (
                item: Record<string, any>,
                index: number,
                arr: Record<string, any>[]
              ) => (
                <div key={item?.id}>
                  <button
                    className="py-2 flex justify-center w-full flex-col "
                    onClick={() =>
                      getOptionValue ? getOptionValue(item) : item?.id
                    }
                  >
                    <span className="text-sm">{getOptionLabel(item)}</span>
                  </button>
                  {arr[index + 1] && <hr className="border-zinc-300 w-full" />}
                </div>
              )
            )}
          </div>
        </menu>
      )}
    </div>
  );
};

export default forwardRef(Dataset);
