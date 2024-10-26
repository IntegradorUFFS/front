import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toTitleCase from "@/helpers/toTitleCase";

interface IProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const schema = z.object({
  name: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

const Form: React.FC<IProps> = ({ user }) => {
  const { register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.first_name + " " + user?.last_name,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="flex flex-row gap-4">
        <div className="h-10 w-10 font-semibold border border-zinc-200 bg-indigo-400 rounded-full text-center text-zinc-50 items-center justify-center flex text-base">
          {user.first_name?.[0]?.toUpperCase()}
          {user.last_name?.[0]?.toUpperCase()}
        </div>
        <h2 className="text-base font-bold text-center flex items-center">
          {toTitleCase(user.first_name + " " + user.last_name)}
        </h2>
      </div>

      <Input
        {...register("first_name")}
        label="Nome"
        placeholder="Digite o seu nome"
        type="text"
      />
      <Input
        {...register("last_name")}
        label="Sobrenome"
        placeholder="Digite o seu sobrenome"
        type="text"
      />
      <Input
        {...register("email")}
        label="Email"
        placeholder="Digite o seu email"
        type="text"
      />
      <Input label="Senha" placeholder="Digite a sua senha" type="password" />
      <Input
        label="Confirmar senha"
        placeholder="Confirme a senha"
        type="password"
      />
    </div>
  );
};

export default Form;
