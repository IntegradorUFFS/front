import { RouterProvider } from "react-router-dom";
import adminRoutes from "./Admin";
import clientRoutes from "./Client";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import adminApi from "@/api/admin";

const Routes = () => {
  const { oauth, permissions } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await adminApi.oauth(oauth).get("/refresh");
      dispatch({ type: "auth/signIn", payload: data });
      return data;
    },
    enabled: !!oauth,
    staleTime: 600000,
    throwOnError() {
      dispatch({ type: "auth/signOut" });
      return true;
    },
  });

  return (
    <RouterProvider
      router={oauth ? adminRoutes({ permissions }) : clientRoutes}
    />
  );
};

export default Routes;
