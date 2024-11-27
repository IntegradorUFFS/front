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

interface IProps {}

const schema = z.object({
  material_id: z.string(),
  quantity: z.number().min(0.001),
  destiny_id: z.string(),
});

const In: React.FC<IProps> = ({}) => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex flex-col gap-4 mb-2">
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
          label="Local"
          endpoint="/location"
          control={control}
          queryKey={["location-autocomplete"]}
          name="location_id"
          getOptionLabel={(option) => option.name}
        />
        <Input label="Quantidade" placeholder="Quantidade" type="number" />
        <div className="flex flex-row justify-center">
          <Button
            type="submit"
            onClick={() => {}}
            text="Registrar"
            className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
            variant="filled"
          />
        </div>
        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
      </div>
    </div>
  );
};

export default In;
