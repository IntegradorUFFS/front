import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Nome",
    keys: ["first_name"],
    isSortable: true,
  },
  {
    title: "Email",
    keys: ["email"],
    isSortable: false,
  },
  {
    title: "Permissão",
    keys: ["role"],
    isSortable: true,
  },
];

const UserPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("user.management");

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Usuários"
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
      <FiltersLine possibleFilters={[]} queryKey={["user"]} />

      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={console.log}
        queryKey={["user"]}
        endpoint="/user/list"
      />
    </div>
  );
};
export default UserPage;
