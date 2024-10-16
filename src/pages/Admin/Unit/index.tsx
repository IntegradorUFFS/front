import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/topSide/FiltersLine";
import TitleLine from "@/components/topSide/TitleLine";
import Table from "@/components/botSide/Table";
import Button from "@/components/common/Button";
import { CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Nome",
    keys: ["name"],
    isSortable: true,
  },
  {
    title: "Unidade",
    keys: ["short_name"],
    isSortable: false,
  },
];

const UnitPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("unit.management");

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Unidade Métricas"
        buttons={
          canManage && [
            <Button
              onClick={console.log}
              icon={<CirclePlus />}
              text="Cadastrar"
              className="w-fit py-2 px-3"
            />,
          ]
        }
      />
      <FiltersLine possibleFilters={[]} queryKey={["unit"]} />
      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={console.log}
        queryKey={["unit"]}
        endpoint="/unit/list"
      />
    </div>
  );
};
export default UnitPage;
