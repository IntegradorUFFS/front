import React, { useEffect } from "react";
import { Archive, BrickWall, ClipboardList, MapPinHouse, Ruler, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import UserMenu from "@/components/UserMenu";
import FiltersLine from "@/components/FiltersLine";
import RippleButton from "@/components/RippleButton";
import clientApi from "@/api/client";
import { useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks/use-toast";
import Input from "@/components/Input"
import Button from "./components/Button";

const App: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

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
          data?.failureReason?.response?.data?.error ?? "Algo deu errado",
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.isError, toast]);

  return (
    <div className="flex flex-1 flex-row ">
        <aside className="bg-zinc-200 min-w-60 max-w-72 w-full h-screen py-4 px-2">
        <UserMenu
          first_name="Conta"
          last_name="Teste"
          email="tetse@gmail.com"
        />
        <RippleButton
          onClick={console.log}
          text="Material"
          icon={<BrickWall />}
          active
        />
        <RippleButton
          onClick={console.log}
          text="Locais"
          icon={<MapPinHouse />}
        />
        <RippleButton
          onClick={console.log}
          text="Estoques"
          icon={<Archive />}
        />
        <RippleButton
          onClick={console.log}
          text="Usuários"
          icon={<Users />}
        />
        <RippleButton
          onClick={console.log}
          text="Transações"
          icon={<ClipboardList />}
        />
        <RippleButton
          onClick={console.log}
          text="Unidades métricas"
          icon={<Ruler />}
        />
      </aside>
      <main className="flex-1 p-6">
        <FiltersLine possibleFilters={[]} />

        <Input placeholder="Digite o seu e-mail" value={2} onChange={console.log} type="password"/>
        {/* <Input placeholder="Digite sua senha" value={2} onChange={}/> */}

        {/* <Button/> */}
      </main>
    </div>
  );
};

export default App;
