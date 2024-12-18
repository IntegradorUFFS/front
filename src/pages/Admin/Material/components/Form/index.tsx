import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/common/Button";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  edit?: {
    id: string;
    name: string;
    category: {
      id: string;
    };
    unit: {
      id: string;
    };
  };
  handleClose?: () => void;
}

const schema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, "Nome deve conter no mínimo 10 caracteres"),
  category_id: z.string({
    required_error: "Categoria é obrigatória",
    invalid_type_error: "Categoria é obrigatória",
  }),
  unit_id: z.string({
    required_error: "Unidade é obrigatória",
    invalid_type_error: "Unidade é obrigatória",
  }),
});

const Form: React.FC<IProps> = ({ edit, handleClose }) => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
      category_id: edit?.category?.id,
      unit_id: edit?.unit?.id,
    },
  });

  const submit = useCallback(
    async (data?: any) => {
      if (!data) return;
      try {
        await new Actions("/material", oauth).save(data, edit?.id);
        toast({
          title: "Sucesso",
          description: `Material ${
            edit ? "atualizado" : "cadastrado"
          } com sucesso`,
        });
        queryClient.invalidateQueries( { queryKey: ["material"] } );
        if (handleClose) handleClose();
      } catch {
        toast({
          title: "Erro",
          description: `Não foi possivel ${
            edit ? "atualizar" : "cadastrar"
          } o material`,
          variant: "destructive",
        });
      }
    },
    [edit, handleClose, oauth]
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        key={"input_name"}
        {...register("name")}
        label="Nome"
        placeholder="Nome do material"
        type="text"
        error={errors.name?.message}
      />
      <Autocomplete
        key={"autocomplete_category"}
        name="category_id"
        control={control}
        label="Categoria"
        placeholder="Digite para pesquisar a catregoria"
        queryKey={["category-autocomplete"]}
        endpoint="/category"
        getOptionLabel={(option) => option.name}
      />
      <Autocomplete
        key={"autocomplete_unit"}
        name="unit_id"
        control={control}
        label="Unidade"
        placeholder="Digite para pesquisar"
        queryKey={["unit-autocomplete"]}
        endpoint="/unit"
        getOptionLabel={(option) => option.name}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          text="Salvar"
          className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
          variant="filled"
        />
      </div>
    </div>
  );
};

export default Form;
