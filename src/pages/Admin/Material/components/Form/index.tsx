import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  category_id: z.number(),
  quantity: z.number(),
  unit: z.string(),
});

const Form: React.FC = () => {
  const { control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category_id: "",
      quantity: 0,
      unit: "",
    },
  });
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input label="Nome" placeholder="Nome do material" type="text" />
      <Autocomplete
        name="category_id"
        control={control}
        label="Categoria"
        placeholder="tetse"
        queryKey={["material-autopcomplete"]}
        endpoint="/material"
        getOptionLabel={(option) => option.name}
      />
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2">
          <Input label="Quantidade" placeholder="Quantidade" type="number" />
        </div>
        <Input label="Unidade" placeholder="Unidade" type="text" />
      </div>
      <Input label="Descrição" placeholder="Descrição" type="text" />
    </div>
  );
};

export default Form;
