import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Data",
    keys: ["created_at"],
    isSortable: true,
    transform: (item: any) => {
      const date = new Date(item);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    title: "Tipo",
    keys: ["type"],
    isSortable: true,
  },
  {
    title: "Local Origem",
    keys: ["origin", "name"],
    isSortable: true,
  },
  {
    title: "Local Destino",
    keys: ["destiny", "name"],
    isSortable: true,
  },
];

const TransactionPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("transaction.management");

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Transações"
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
      <FiltersLine possibleFilters={[]} queryKey={["transaction"]} />
      <Table
        fields={fields}
        queryKey={["transaction"]}
        endpoint="/transaction/list"
      />
    </div>
  );
};
export default TransactionPage;
