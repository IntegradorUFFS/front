import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/topSide/FiltersLine";
import TitleLine from "@/components/topSide/TitleLine";
import Table from "@/components/botSide/Table";
import Button from "@/components/common/Button";
import { CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Local",
    keys: ["name"],
    isSortable: true,
  },
];

const LocationPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("location.management");

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Locais"
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
      <FiltersLine possibleFilters={[]} queryKey={["location"]} />
      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={console.log}
        queryKey={["location"]}
        endpoint="/location/list"
      />
    </div>
  );
};
export default LocationPage;
