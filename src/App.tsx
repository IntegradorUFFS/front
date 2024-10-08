import React, { useEffect } from "react";
import { BrickWall } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import UserMenu from "@/components/UserMenu";
import FiltersLine from "@/components/FiltersLine";
import RippleButton from "@/components/RippleButton";
import clientApi from "@/api/client";
import { useAppDispatch } from "@/hooks";
import { useToast } from "@/hooks/use-toast";

const App: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await clientApi.post("/auth", {
        email: "teste@teste.com",
        password: "12awDw3",
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
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              // variant: "destructive",
            });
          }}
          text="Material"
          icon={<BrickWall />}
          active
        />
      </aside>
      <main className="flex-1 p-6">
        <FiltersLine possibleFilters={[]} />
      </main>
    </div>
  );
};

export default App;
