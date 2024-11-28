import Input from "@/components/common/Input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import Actions from "@/helpers/Actions";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks";

interface IProps {
  edit?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  handleClose?: () => void;
}

const editingSchema = z
  .object({
    first_name: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome é obrigatório",
      })
      .min(3, "Nome invalido"),
    last_name: z.string().optional(),
    email: z
      .string({
        required_error: "E-mail inválido",
        invalid_type_error: "E-mail inválido",
      })
      .email({ message: "E-mail inválido" })
      .min(10, "O e-mail deve conter no mínimo 10 caracteres"),
    role: z.string({
      required_error: "Permissão é obrigatória",
      invalid_type_error: "Permissão inválida",
    }),
    password: z
      .string({
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .or(z.literal("")),
    confirm_password: z
      .string({
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

const schema = z
  .object({
    first_name: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome é obrigatório",
      })
      .min(3, "Nome invalido"),
    last_name: z.string().optional(),
    email: z
      .string({
        required_error: "E-mail inválido",
        invalid_type_error: "E-mail inválido",
      })
      .email({ message: "E-mail inválido" })
      .min(10, "O e-mail deve conter no mínimo 10 caracteres"),
    role: z.string({
      required_error: "Permissão é obrigatória",
      invalid_type_error: "Permissão inválida",
    }),
    password: z
      .string({
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirm_password: z
      .string({
        invalid_type_error: "Senha inválida",
      })
      .min(8, "A senha deve conter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

const Form: React.FC<IProps> = ({ edit, handleClose }) => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(edit?.id ? editingSchema : schema),
    defaultValues: {
      email: edit?.email,
      first_name: edit?.first_name,
      last_name: edit?.last_name,
      role: edit?.role,
      password: "",
      confirm_password: "",
    },
  });

  const submit = useCallback(
    async (data?: any) => {
      if (!data) return;
      if (data.password && data.password !== data.confirm_password) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive",
        });
        return;
      }
      try {
        await new Actions("/user", oauth).save(data, edit?.id);
        toast({
          title: "Sucesso",
          description: `Usuario ${
            edit ? "atualizado" : "cadastrado"
          } com sucesso`,
        });
        if (handleClose) handleClose();
      } catch (error) {
        toast({
          title: "Erro",
          description: `Não foi possivel ${
            edit ? "atualizar" : "cadastrar"
          } o usuario`,
          variant: "destructive",
        });
      }
    },
    [handleClose]
  );

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("email")}
        key="email"
        label="Email"
        placeholder="Email do usuário"
        type="text"
        error={errors.email?.message}
      />
      <Input
        {...register("first_name")}
        key="first_name"
        label="Nome"
        placeholder="Nome do usuário"
        type="text"
        error={errors.first_name?.message}
      />
      <Input
        {...register("last_name")}
        key="last_name"
        label="Sobrenome"
        placeholder="Sobrenome do usuário"
        type="text"
        error={errors.last_name?.message}
      />
      <Select
        control={control}
        key="role"
        label="Permissão"
        options={[
          { value: "viewer", label: "Visualizador" },
          { value: "manager", label: "Gerente" },
        ]}
        error={errors.role?.message}
        {...register("role")}
      />

      <Input
        label="Senha"
        key="password"
        placeholder="Senha do usuário"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        label="Confirmar senha"
        key="confirm_password"
        placeholder="Confirme a senha"
        type="password"
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
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
