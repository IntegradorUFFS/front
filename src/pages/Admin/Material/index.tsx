import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/topSide/FiltersLine";
import TitleLine from "@/components/topSide/TitleLine";
import Table from "@/components/botSide/Table";
import Button from "@/components/common/Button";
import { Tags, CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Material",
    keys: ["name"],
    isSortable: true,
  },
  {
    title: "Categoria",
    keys: ["category", "name"],
    isSortable: true,
  },
  {
    title: "Quantidade",
    keys: ["quantity"],
    isSortable: true,
  },
  {
    title: "Unidade",
    keys: ["unit", "short_name"],
  },
];

const MaterialPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("material.management");

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Material"
        buttons={
          canManage && [
            <Button onClick={console.log} icon={<Tags />} className="p-2" />,
            <Button
              onClick={console.log}
              icon={<CirclePlus />}
              text="Cadastrar"
              className="w-fit py-2 px-3"
            />,
          ]
        }
      />
      <FiltersLine possibleFilters={[]} queryKey={["material"]} />

      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={console.log}
        queryKey={["material"]}
        endpoint="/material/list"
      />
    </div>
  );
};
export default MaterialPage;
