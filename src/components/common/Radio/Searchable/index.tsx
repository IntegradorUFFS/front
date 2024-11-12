import React, { forwardRef, useEffect, useMemo } from "react";
import RadioBase from "../Base";
import Input from "../../Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks";
import Actions from "@/helpers/Actions";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  endpoint: string;
}

const schema = z.object({
  search: z.string().min(1),
});

const Radio: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { name, placeholder, endpoint },
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

  const { data } = useQuery({
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

  console.log(data);

  return (
    <div className="flex flex-col gap-1">
      <Input placeholder={placeholder} {...register("search")} />
      <RadioBase
        items={data?.map(({ name, id }: { name: string; id: string }) => ({
          label: name,
          value: id,
        }))}
        name={name}
        ref={ref}
      />
    </div>
  );
};

// const FowaredRadio = forwardRef(Radio);

export default forwardRef(Radio);
