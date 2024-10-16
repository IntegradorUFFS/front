import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/topSide/FiltersLine";
import TitleLine from "@/components/topSide/TitleLine";
import Table from "@/components/botSide/Table";
import Button from "@/components/common/Button";
import { CirclePlus } from "lucide-react";

const fields = [
  {
    title: "Data",
    keys: ["created_at"],
    transform: (item: any) => {
      const date = new Date(item);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    title: "Tipo",
    keys: ["type"],
    transform: (item: any) => {
      switch (item) {
        case "in":
          return "Entrada";
        case "transfer":
          return "Transferência";
        case "out":
          return "Saida";
        default:
          return "Algo deu errado";
      }
    },
  },
  {
    title: "Material",
    keys: ["material", "name"],
    isSortable: true,
  },
  {
    title: "Quantidade",
    keys: ["quantity"],
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
