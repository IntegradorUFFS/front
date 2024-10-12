import MaterialPage from "@/pages/Admin/Material";
import { BrickWall } from "lucide-react";
// import {
//   Archive,
//   BrickWall,
//   ClipboardList,
//   MapPinHouse,
//   Ruler,
//   Users,
// } from "lucide-react";

export default [
  {
    name: "Material",
    path: "/admin/material",
    icon: <BrickWall />,
    element: <MaterialPage />,
    scope: "material.view",
    children: [{ path: "", element: "" }],
  },
];

// export default [
//   {
//     name: "Material",
//     path: "/material",
//     icon: <BrickWall />,
//     element: <MaterialPage />,
//     children: [{ path: "", element: "" }],
//   },
//   {
//     name: "Locais",
//     path: "/location",
//     icon: <MapPinHouse />,
//     element: "",
//     children: [{ path: "", element: "" }],
//   },
//   {
//     name: "Estoque",
//     path: "/location-material",
//     icon: <Archive />,
//     element: "",
//     children: [{ path: "", element: "" }],
//   },
//   {
//     name: "Usuários",
//     path: "/user",
//     icon: <Users />,
//     element: "",
//     children: [{ path: "", element: "" }],
//   },
//   {
//     name: "Transações",
//     path: "/transaction",
//     icon: <ClipboardList />,
//     element: "",
//     children: [{ path: "", element: "" }],
//   },
//   {
//     name: "Unidades métricas",
//     path: "/unit",
//     icon: <Ruler />,
//     element: "",
//     children: [{ path: "", element: "" }],
//   },
// ];
