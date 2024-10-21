import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IProps {
  edit?: boolean;
}

const schema = z.object({
  name: z.string(),
  category_id: z.number(),
  quantity: z.number(),
  unit: z.string(),
});

const Form: React.FC<IProps> = ({ edit }) => {
  const { control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: edit
      ? {
          name: "m_teste",
          category_id: "",
          quantity: 0,
          unit: "metros",
        }
      : {
          name: "",
          category_id: "",
          quantity: 0,
          unit: "",
        },
  });
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Nome"
        placeholder="Nome do material"
        type="text"
        value={edit ? "nome do item selecionado" : ""}
      />
      <Autocomplete
        name="category_id"
        control={control}
        label="Categoria"
        placeholder="Digite para pesquisar a catregoria"
        queryKey={["material-autopcomplete"]}
        endpoint="/material"
        getOptionLabel={(option) => option.name}
      />
      <div className="grid grid-cols-2 gap-4 ">
        <Input
          label="Quantidade"
          placeholder="Quantidade"
          type="number"
          value={edit ? "123" : ""}
        />
        <Autocomplete
          name="unit_id"
          control={control}
          label="Unidade"
          placeholder="Digite para pesquisar"
          queryKey={["unit-autopcomplete"]}
          endpoint="/unit"
          getOptionLabel={(option) => option.name}
        />
      </div>
      <Input
        label="Descrição"
        placeholder="Descrição"
        type="text"
        value={edit ? "descrição completa do item selecionado" : ""}
      />
    </div>
  );
};

export default Form;
