import LocationPage from "@/pages/Admin/Location";
import LocationMaterialPage from "@/pages/Admin/LocationMaterial";
import MaterialPage from "@/pages/Admin/Material";
import TransactionPage from "@/pages/Admin/Transaction";
import UnitPage from "@/pages/Admin/Unit";
import UserPage from "@/pages/Admin/User";
import {
  Archive,
  BrickWall,
  ClipboardList,
  MapPinHouse,
  Ruler,
  Users,
} from "lucide-react";

export default [
  {
    name: "Material",
    path: "/admin/material",
    icon: <BrickWall />,
    element: <MaterialPage />,
    scope: "material.view",
    children: [{ path: "", element: "" }],
  },
  {
    name: "Locais",
    path: "/admin/location",
    icon: <MapPinHouse />,
    element: <LocationPage />,
    scope: "location.view",
    children: [{ path: "", element: "" }],
  },
  {
    name: "Estoque",
    path: "/admin/location-material",
    icon: <Archive />,
    element: <LocationMaterialPage />,
    scope: "locationMaterial.view",
    children: [{ path: "", element: "" }],
  },
  {
    name: "Usuários",
    path: "/admin/user",
    icon: <Users />,
    element: <UserPage />,
    scope: "user.view",
    children: [{ path: "", element: "" }],
  },
  {
    name: "Transações",
    path: "/admin/transaction",
    icon: <ClipboardList />,
    element: <TransactionPage />,
    scope: "transaction.view",
    children: [{ path: "", element: "" }],
  },
  {
    name: "Unidades métricas",
    path: "/admin/unit",
    icon: <Ruler />,
    element: <UnitPage />,
    scope: "unit.view",
    children: [{ path: "", element: "" }],
  },
];
