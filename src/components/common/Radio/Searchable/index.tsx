import React, { forwardRef, useEffect, useMemo } from "react";
import RadioBase from "../Base";
import Input from "../../Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks";
import Actions from "@/helpers/Actions";
import { SearchIcon } from "lucide-react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  endpoint: string;
}

const schema = z.object({
  search: z.string().min(1),
});

const Radio: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { name, placeholder, endpoint, ...props },
  ref
) => {
  const queryKey = useMemo(() => ["search", endpoint], [endpoint]);
  const queryClient = useQueryClient();

  const oauth = useAppSelector((state) => state.auth.oauth);

  const { watch, register, getValues } = useForm({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(schema),
  });

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const search = getValues("search");
      const res = await new Actions(endpoint, oauth).fetch({
        filters: { name: search },
      });
      return res.data;
    },
  });

  const search = watch("search");

  useEffect(() => {
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, queryClient, queryKey]);

  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <div className="py-2 flex flex-row border border-zinc-300 rounded-md">
        <SearchIcon
          size={18}
          className="m-2 text-zinc-400 justify-self-center"
        />
        <Input
          type="text"
          className="flex items-center w-full text-m focus:outline-none bg-transparent"
          placeholder={placeholder}
          {...register("search")}
        />
      </div>
      <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
        {isFetching && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner text-zinc-400 animate-pulse">
              Buscando...
            </span>
          </div>
        )}
        {!isFetching && (
          <RadioBase
            items={data?.map(({ name, id }: { name: string; id: string }) => ({
              label: name,
              value: id,
            }))}
            name={name}
            ref={ref}
            {...props}
          />
        )}
      </div>
    </div>
  );
};

export default forwardRef(Radio);
