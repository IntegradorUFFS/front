import List from "@/components/List";
import { TColumns } from "@/components/List";
import { data } from "./test";
import { useAppDispatch } from "@/hooks";
import React, { useEffect } from "react";
import StatusComponent from "./components/list/Status";
import LastInfractionComponent from "./components/list/LastInfraction";
import MenuComponent from "./components/list/Actions";

export const columns: TColumns[] = [
  {
    type: "string",
    label: "Motorista",
    keys: ["driver"],
    width: "minmax(210px,1fr)",
  },
  {
    type: "number",
    label: "Valor da infração",
    keys: ["infractionValue"],
    formatter: (data) => `R$ ${Number(data).toLocaleString("pt-BR", {})}`,
    width: 210,
  },
  {
    type: "number",
    label: "Infrações",
    keys: ["infractions"],
    width: 120,
  },
  {
    type: "component",
    label: "Status",
    component: StatusComponent,
    width: 210,
  },
  {
    type: "component",
    label: "Última infração",
    component: LastInfractionComponent,
    width: 210,
  },
  {
    type: "component",
    label: "Mais ações",
    component: MenuComponent,
    width: 94,
  },
];

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "layout/setBreadcrumb", payload: "Condutores" });
  }, [dispatch]);
  return (
    <>
      <div className="px-6 pb-8 flex flex-col h-full w-full min-w-fit">
        <div className="flex-1  w-full min-w-fit bg-white rounded-2xl p-5">
          <List columns={columns} data={data} attrKey={["driver"]} />
        </div>
      </div>
    </>
  );
};

export default Page;
