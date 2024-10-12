import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
import Layout from "@/layout";

interface IProps {
  permissions: string[] | undefined;
}

const router = ({ permissions }: IProps) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/admin" element={<Layout />}>
          {routes
            .filter(({ scope }) => permissions && permissions.includes(scope))
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
        </Route>
        <Route
          path="*"
          element={<Navigate to={routes[0].path} replace={true} />}
        />
      </>
    )
  );

export default router;
