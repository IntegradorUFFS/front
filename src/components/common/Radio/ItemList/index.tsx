import React, { forwardRef, useMemo } from "react";
import RadioBase from "../Base";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks";
import Actions from "@/helpers/Actions";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  endpoint: string;
  type?: string;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { name, endpoint, type },
  ref
) => {
  const queryKey = useMemo(() => ["search", endpoint], [endpoint]);
  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const res = await new Actions(endpoint, oauth).fetch({
        filters: {},
      });
      return res.data;
    },
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-1">
      <RadioBase
        items={data?.map((item: Record<string, any>) => ({
          label:
            type === "role"
              ? item.role
              : type === "user"
              ? item.first_name + " " + item.last_name
              : item.name,
          value: item.id,
        }))}
        name={name}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(Radio);
