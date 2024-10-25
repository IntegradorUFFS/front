import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
});

const Form: React.FC<IProps> = ({ edit }) => {
  const { control, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.first_name + " " + edit?.last_name,
      email: edit?.email,
      role: edit?.role,
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
        {...register("name")}
        label="Nome"
        placeholder="Nome do usuário"
        type="text"
      />
      <Autocomplete
        name="role"
        control={control}
        label="Permissão"
        placeholder="Digite para pesquisar a permissão"
        queryKey={["user-autopcomplete"]}
        endpoint="/user"
        getOptionLabel={(option) => {
          switch (option) {
            case "viewer":
              return "Visualizador";
            case "admin":
              return "Administrador";
            case "manager":
              return "Gerente";
            default:
              return "Algo deu errado";
          }
        }}
      />
      <Input label="Senha" placeholder="Senha do usuário" type="password" />
      <Input
        label="Confirmar senha"
        placeholder="Confirme a senha"
        type="password"
      />
    </div>
  );
};

export default Form;
