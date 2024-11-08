import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "@/components/common/Select";
interface IProps {
  edit?: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: z.string(),
  password: z.string().optional(),
  confirm_password: z.string().optional(),
});

const Form: React.FC<IProps> = ({ edit }) => {
  const { register, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: edit?.email,
      first_name: edit?.first_name,
      last_name: edit?.last_name,
      role: edit?.role,
      password: "",
      confirm_password: "",
    },
  });
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("email")}
        label="Email"
        placeholder="Email do usuário"
        type="text"
      />
      <Input
        {...register("first_name")}
        label="Nome"
        placeholder="Nome do usuário"
        type="text"
      />
      <Input
        {...register("last_name")}
        label="Sobrenome"
        placeholder="Sobrenome do usuário"
        type="text"
      />
      <Select
        control={control}
        label="Permissão"
        options={[
          { value: "viewer", label: "Visualizador" },
          { value: "manager", label: "Gerente" },
        ]}
      />

      <Input
        label="Senha"
        placeholder="Senha do usuário"
        type="password"
        {...register("password")}
      />
      <Input
        label="Confirmar senha"
        placeholder="Confirme a senha"
        type="password"
        {...register("confirm_password")}
      />
    </div>
  );
};

export default Form;
