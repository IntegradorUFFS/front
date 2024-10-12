import { RouterProvider } from "react-router-dom";
import adminRoutes from "./Admin";
import clientRoutes from "./Client";
import { useAppSelector } from "@/hooks";

const Routes = () => {
  const oauth = useAppSelector(({ auth }) => auth.oauth);
  return <RouterProvider router={oauth ? adminRoutes : clientRoutes} />;
};

export default Routes;
