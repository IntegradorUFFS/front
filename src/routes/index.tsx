import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import adminRoutes from "./Admin";
import clientRoutes from "./Client";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import adminApi from "@/api/admin";
import { useToast } from "@/hooks/use-toast";

const Routes: React.FC = () => {
  const { toast } = useToast();
  const permissions = useAppSelector(({ auth }) => auth.permissions);
  const logged = useAppSelector(({ auth }) => auth.logged);
  const oauth = useAppSelector(({ auth }) => auth.oauth);
  const dispatch = useAppDispatch();
  const { isError } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await adminApi.oauth(oauth).get("/refresh");
      dispatch({ type: "auth/refresh", payload: data });
      return data;
    },
    enabled: !!logged,
    staleTime: 600000,
  });

  useEffect(() => {
    if (isError) {
      dispatch({ type: "auth/signOut" });
      toast({
        title: "Erro",
        description:
          "Algo deu errado com a sua sessão, por favor entre novamente.",
        variant: "destructive",
      });
    }
  }, [isError, dispatch, toast]);

  return (
    <RouterProvider
      router={logged ? adminRoutes({ permissions }) : clientRoutes}
    />
  );
};

export default Routes;
