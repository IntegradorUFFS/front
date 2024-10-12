import { RouterProvider } from "react-router-dom";
import adminRoutes from "./Admin";
import clientRoutes from "./Client";
import { useAppSelector } from "@/hooks";

const Routes = () => {
  const { oauth, permissions } = useAppSelector(({ auth }) => auth);
  return (
    <RouterProvider
      router={oauth ? adminRoutes({ permissions }) : clientRoutes}
    />
  );
};

export default Routes;
