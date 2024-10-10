import {
  Archive,
  BrickWall,
  ClipboardList,
  MapPinHouse,
  Ruler,
  Users,
} from "lucide-react";

//criar categoria
export const category = "/category";

//Rotas de ação
export const show = "/show";
export const create = "/create";
export const edit = "/edit";
export const list = "/list";
export const dashboard = "/dashboard";
export const settings = "/settings";
export const delet = "/delete";
export const autocomplete = "/autocomplete";

export default [
  {
    name: "Material",
    path: "/material",
    icon: <BrickWall />,
    component: "",
    children: [{ path: "", component: "" }],
  },
  {
    name: "Locais",
    path: "/location",
    icon: <MapPinHouse />,
    component: "",
    children: [{ path: "", component: "" }],
  },
  {
    name: "Estoque",
    path: "/location-material",
    icon: <Archive />,
    component: "",
    children: [{ path: "", component: "" }],
  },
  {
    name: "Usuários",
    path: "/user",
    icon: <Users />,
    component: "",
    children: [{ path: "", component: "" }],
  },
  {
    name: "Transações",
    path: "/transaction",
    icon: <ClipboardList />,
    component: "",
    children: [{ path: "", component: "" }],
  },
  {
    name: "Unidades métricas",
    path: "/unit",
    icon: <Ruler />,
    component: "",
    children: [{ path: "", component: "" }],
  },
];
