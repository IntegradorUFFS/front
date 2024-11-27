import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import Autocomplete from "@/components/common/Autocomplete";

const schema = z.object({
  material_id: z.string(),
  quantity: z.number().min(0.001),
  origin_id: z.string(),
  destiny_id: z.string(),
});
const queryKey = ["out", "quantity"];
const Form: React.FC = () => {
  const queryClient = useQueryClient();
  const oauth = useAppSelector((state) => state.auth.oauth);
  const { control, watch } = useForm({
    resolver: zodResolver(schema),
  });
  const material_id = watch("material_id");
  const location_id = watch("location_id");

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      if (!material_id || !location_id)
        throw new Error("Material or location not found");
      const res = await new Actions("/location-material/relation", oauth).fetch(
        {
          extra_params: { location_id, material_id },
        }
      );
      return res.data;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material_id, location_id, queryClient, queryKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-0.5 bg-zinc-200 col-span-2"></div>
      <Autocomplete
        label="Material"
        endpoint="/material"
        control={control}
        queryKey={["material-autocomplete"]}
        name="material_id"
        getOptionLabel={(option) => option.name}
      />
      <Autocomplete
        label="Local de origem"
        endpoint="/location"
        control={control}
        queryKey={["location-autocomplete"]}
        name="location_id"
        disabled={!material_id}
        getOptionLabel={(option) => option.name}
        extraFilter={{ "filter[material_id]": material_id }}
      />
      <Input
        label="Quantidade"
        placeholder="Quantidade"
        type="quantity"
        qtd={
          location_id && material_id && data && !isFetching
            ? data?.quantity
            : "-"
        }
        disabled={!location_id}
      />
      <div className="flex flex-row justify-center">
        <Button
          type="submit"
          onClick={() => {}}
          text="Registrar"
          className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
          variant="filled"
        />
      </div>
    </div>
  );
};

export default Form;
