import Input from "@/components/common/Input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toTitleCase from "@/helpers/toTitleCase";
import { forwardRef } from "react";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import Actions from "@/helpers/Actions";
interface IProps {
  user: {
    id: string;
    first_name: string;
    last_name?: string;
    email: string;
  };
  handleClose?: () => void;
}

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

const Form: React.ForwardRefRenderFunction<HTMLDivElement | null, IProps> = (
  { user, handleClose },
  ref
) => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user?.last_name,
      password: undefined,
      confirm_password: undefined,
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
        await new Actions("/user", oauth).save(data, user.id);
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso",
        });
        if (handleClose) handleClose();
      } catch {
        toast({
          title: "Erro",
          description: "Erro ao atualizar perfil",
          variant: "destructive",
        });
      }
    },
    [handleClose, oauth, user.id]
  );

  return (
    <>
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
          <span>Nome</span>
          <Input
            error={errors.first_name?.message}
            {...register("first_name")}
            placeholder="Digite o seu nome"
            type="text"
          />
          <div className="h-0.5 bg-zinc-200 col-span-2"></div>

          <span>Sobrenome</span>
          <Input
            error={errors.last_name?.message}
            {...register("last_name")}
            placeholder="Digite o seu sobrenome"
            type="text"
          />

          <div className="h-0.5 bg-zinc-200 col-span-2"></div>
          <span>Email</span>
          <Input
            error={errors.email?.message}
            {...register("email")}
            placeholder="Digite o seu email"
            type="text"
          />

          <div className="h-0.5 bg-zinc-200 col-span-2"></div>
          <span>Senha</span>
          <Input
            placeholder="Digite a sua senha"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <div className="h-0.5 bg-zinc-200 col-span-2"></div>
          <span>Confirmar senha</span>
          <Input
            placeholder="Confirme a senha"
            type="password"
            {...register("confirm_password")}
            error={errors.confirm_password?.message}
          />

          <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          text="Salvar"
          className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
          variant="filled"
        />
      </div>
    </>
  );
};

export default forwardRef(Form);
