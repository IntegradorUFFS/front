import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toTitleCase from "@/helpers/toTitleCase";
import { forwardRef } from "react";

interface IProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const schema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

const Form: React.ForwardRefRenderFunction<HTMLDivElement | null, IProps> = (
  { user },
  ref
) => {
  const { register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  return (
    <div className="flex flex-col gap-4 mb-2 w-[50vw]" ref={ref}>
      <div className="absolute left-10 mt-6 h-10 w-10 font-semibold border border-zinc-200 bg-indigo-400 rounded-full text-center text-zinc-50 items-center justify-center flex text-base">
        {user.first_name?.[0]?.toUpperCase()}
        {user.last_name?.[0]?.toUpperCase()}
      </div>
      <div className="h-0.5 bg-zinc-200 mt-11"></div>
      <div className="flex flex-col">
        <h2 className="text-base font-bold text-center flex items-center mt-2">
          {toTitleCase(user.first_name + " " + user.last_name)}
        </h2>
        <p className="text-xs opacity-60 font-semibold">{user.email}</p>
      </div>
      <div className="grid grid-cols-[120px_auto] grid-rows-[repeat(12,_auto)] gap-y-3 gap-x-4 items-center text-sm">
        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        <span className=" ">Nome</span>
        <Input
          {...register("first_name")}
          placeholder="Digite o seu nome"
          type="text"
        />
        <div className="h-0.5 bg-zinc-200 col-span-2"></div>

        <span>Sobrenome</span>
        <Input
          {...register("last_name")}
          placeholder="Digite o seu sobrenome"
          type="text"
        />

        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        <span>Email</span>
        <Input
          {...register("email")}
          placeholder="Digite o seu email"
          type="text"
        />

        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        <span>Senha</span>
        <Input placeholder="Digite a sua senha" type="password" />

        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        <span>Confirmar senha</span>
        <Input placeholder="Confirme a senha" type="password" />

        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
      </div>
    </div>
  );
};

export default forwardRef(Form);
