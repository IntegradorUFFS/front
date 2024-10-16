import React, { useCallback, useEffect } from "react";
import { Ruler } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import FiltersLine from "@/components/List/FiltersLine";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clientApi from "@/api/client";
import { useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import Input from "@/components/common/Input";
import Button from "./components/common/Button";
import { IApiError } from "./helpers/interfaces";
import Sidebar from "@/layout/Sidebar";

const schema = z.object({
  email: z.string(),
});

const App: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      console.log(data);
      reset();
    },
    [reset]
  );

  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await clientApi.post("/auth", {
        email: "teste@teste.com",
        password: "123",
      });
      console.log(res?.data?.data);
      toast({
        // title: "Error",
        description: res?.data?.message,
      });
      dispatch({ type: "auth/signIn", payload: res?.data });
      return res?.data;
    },
  });

  useEffect(() => {
    if (data.isError) {
      toast({
        title: "Error",
        description:
          (data.error as unknown as IApiError)?.response?.data?.error ??
          "Algo deu errado",
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.isError, toast]);
  return (
    <div className="flex flex-1 flex-row ">
      <Sidebar />
      <main className="flex-1 p-6">
        <FiltersLine possibleFilters={[]} />

        <Input
          placeholder="Digite o seu e-mail"
          {...register("email")}
          label="teste"
        />
        <Input
          type="password"
          placeholder="Digite o seu e-mail"
          {...register("email")}
        />
        <div className="w-full flex p-4 gap-4 my-4">
          <Button onClick={handleSubmit(onSubmit)} text="Entrar" />
          <Button
            onClick={handleSubmit(onSubmit)}
            icon={<Ruler />}
            text="Entrar"
            variant="filled"
          />
        </div>
      </main>
    </div>
  );
};

export default App;
