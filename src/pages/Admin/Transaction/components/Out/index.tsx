import Accordion from "@/components/common/Accordion";
import Select from "@/components/common/Select";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import Autocomplete from "@/components/common/Autocomplete";
import In from "../In";

interface IProps {}

const schema = z.object({
  material_id: z.string(),
  quantity: z.number().min(0.001),
  origin_id: z.string(),
  destiny_id: z.string(),
});

const Form: React.FC<IProps> = ({}) => {
  const materialEndpoint = "/";
  const queryKey = useMemo(
    () => ["search", materialEndpoint],
    [materialEndpoint]
  );
  const oauth = useAppSelector((state) => state.auth.oauth);
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const material_id = watch("material_id");
  const location_id = watch("location_id");

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
        qtd={location_id ? : 0}
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
