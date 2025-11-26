import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import routes, { IDirect } from "./routes";
import Layout from "@/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        {routes
          .reduce((acc, item) => {
            if (item.type === "direct") return [...acc, item];
            return [
              ...acc,
              ...item.items.map((i) => ({ ...i, href: item.baseUrl + i.href })),
            ];
          }, [] as IDirect[])
          .filter((i) => !i.disabled)
          .map((route: IDirect) => (
            <Route key={route.href} path={route.href} element={route.element} />
          ))}
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={
              routes[0].type === "direct"
                ? routes[0].href
                : routes[0].items[0].href
            }
            replace={true}
          />
        }
      />
    </>
  )
);

export default router;
