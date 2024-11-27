import Input from "@/components/common/Input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/common/Button";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { toast } from "@/hooks/use-toast";

interface IProps {
  edit?: {
    id: string;
    name: string;
  };
  handleClose?: () => void;
}

const schema = z.object({
  name: z
    .string({
      required_error: "O local é obrigatório",
      invalid_type_error: "O local é obrigatório",
    })
    .min(3, "Local deve conter no mínimo 3 caracteres"),
});

const Form: React.FC<IProps> = ({ edit, handleClose }) => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
    },
  });

  const submit = useCallback(
    async (data?: any) => {
      if (!data) return;
      try {
        await new Actions("/location", oauth).save(data, edit?.id);
        toast({
          title: "Sucesso",
          description: `Local ${
            edit ? "atualizado" : "cadastrado"
          } com sucesso`,
        });
        if (handleClose) handleClose();
      } catch {
        toast({
          title: "Erro",
          description: `Não foi possivel ${
            edit ? "atualizar" : "cadastrar"
          } o local`,
          variant: "destructive",
        });
      }
    },
    [handleClose]
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        {...register("name")}
        label="Nome"
        placeholder="Nome do Local"
        type="text"
        error={errors.name?.message}
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
