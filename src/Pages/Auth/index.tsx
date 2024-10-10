import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import clientApi from "@/api/client";
import { useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import { IApiError } from "@/helpers/interfaces";
import Input from "@/components/Input";
import Button from "@/components/Button";

const schema = z.object({
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .min(10, "O e-mail deve conter no mínimo 10 caracteres"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type AuthSchema = z.infer<typeof schema>;

const Auth: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: AuthSchema) => await clientApi.post("/auth", data),
    onSuccess: (res) => {
      dispatch({ type: "auth/signIn", payload: res?.data });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description:
          (error as unknown as IApiError)?.response?.data?.error ??
          "Algo deu errado",
        variant: "destructive",
      });
    },
  });

  const onSubmit = useCallback(
    async (data: AuthSchema) => {
      await mutateAsync(data);
      reset();
    },
    [mutateAsync, reset]
  );

  return (
    <div className="flex overflow-hidden">
      <div className="h-screen overflow-hidden w-6/12 max-w-[650px] relative md:flex hidden">
        <img src="/images/artemis.jpg" alt="" className="min-h-full w-full" />
        <div className="absolute h-full w-6 bg-white rounded-l-xl top-0 right-0 border-solid border-l-2 border-zinc-200 drop-shadow-md" />
      </div>
      <main className="flex-1 w-6/12">
        <div className="flex flex-col items-center mt-9 mx-11">
          <img className="h-12" src="/images/logo_text.svg" alt="" />
          <div className="w-full mt-24 mb-12 font-sans">
            <h2 className="text-2xl">Bem-vindo de volta!</h2>
            <h1 className="text-4xl font-bold mt-3">Entre em sua conta</h1>
          </div>

          <form className="flex flex-col w-full gap-6 mb-8">
            <div>
              <Input
                label="E-mail"
                placeholder="Digite o seu e-mail"
                {...register("email")}
                name="email"
                error={errors.email?.message}
              />
            </div>
            <div>
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                {...register("password")}
                name="password"
                error={errors.password?.message}
              />
            </div>
            <div>
              <Button
                variant="filled"
                text="Entrar"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Auth;
