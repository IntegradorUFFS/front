import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/client">
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
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
