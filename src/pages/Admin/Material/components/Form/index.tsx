import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IProps {
  edit?: {
    name: string;
    category: {
      id: string;
    };
    unit: {
      id: string;
    };
  };
}

const schema = z.object({
  name: z.string(),
  category_id: z.number(),
  unit_id: z.string(),
});

const Form: React.FC<IProps> = ({ edit }) => {
  const { control, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
      category_id: edit?.category?.id,
      unit_id: edit?.unit?.id,
    },
  });

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("name")}
        label="Nome"
        placeholder="Nome do material"
        type="text"
      />
      <Autocomplete
        name="category_id"
        control={control}
        label="Categoria"
        placeholder="Digite para pesquisar a catregoria"
        queryKey={["category-autocomplete"]}
        endpoint="/category"
        getOptionLabel={(option) => option.name}
      />
      <Autocomplete
        name="unit_id"
        control={control}
        label="Unidade"
        placeholder="Digite para pesquisar"
        queryKey={["unit-autocomplete"]}
        endpoint="/unit"
        getOptionLabel={(option) => option.name}
      />
    </div>
  );
};

export default Form;
