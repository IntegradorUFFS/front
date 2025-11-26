import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import clientApi from "@/api/client";
import { useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import helpMessages from "@/helpers/helpMessages";
import extractErrors from "@/helpers/extractErrors";

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

  const { mutateAsync, error } = useMutation({
    mutationFn: async (data: AuthSchema) => await clientApi.post("/auth", data),
    onSuccess: (res) => {
      dispatch({ type: "auth/signIn", payload: res?.data });
    },
    onError: (err) => {
      const { field, error } = extractErrors(err);
      if (field) return;

      toast({
        title: "Erro",
        description: helpMessages(error) || "Algo deu errado",
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

  const { data: apiErrors } = extractErrors(error);

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2.5 self-center font-display text-lg tracking-tight hover:opacity-90 transition-opacity">
          <img
            src="/logo_text.png"
            alt="Multazero logo"
            width={131}
            height={0}
            className="h-auto"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="border rounded-xl bg-card shadow-xs">
            <div className="p-6 text-center border-b">
              <h2 className="text-2xl tracking-tight">Bem-vindo de volta</h2>
            </div>

            <div className="p-6">
              <form className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Input
                    label="E-mail"
                    placeholder="Digite o seu e-mail"
                    {...register("email")}
                    name="email"
                    error={
                      errors.email?.message || helpMessages(apiErrors?.email)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    {...register("password")}
                    name="password"
                    error={
                      errors.password?.message ||
                      helpMessages(apiErrors?.password)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant="filled"
                    text="Entrar"
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
              </form>
            </div>
          </div>

          <p className="px-6 text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="font-medium hover:underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="font-medium hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
