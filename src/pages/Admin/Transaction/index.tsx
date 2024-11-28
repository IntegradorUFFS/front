import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/List/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/List/Table";
import Button from "@/components/common/Button";
import { CirclePlus } from "lucide-react";
import Dialog from "@/components/common/Dialog";
import Accordion from "./components/Accordion";

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
            <Dialog
              triggerElement={
                <Button
                  icon={<CirclePlus />}
                  className="p-2"
                  text="Cadastrar"
                />
              }
              title="Transações"
            >
              <Accordion />
            </Dialog>,
          ]
        }
      />
      <FiltersLine
        queryKey={["transaction"]}
        filters={[
          {
            title: "Material",
            endpoint: "/material/list",
            placeholder: "Pesquise o material",
            name: "material_id",
          },
          {
            title: "Local de origem",
            endpoint: "/location/list",
            placeholder: "Pesquise o local de origem",
            name: "origin_id",
          },
          {
            title: "Local de destino",
            endpoint: "/location/list",
            placeholder: "Pesquise o local de destino",
            name: "destiny_id",
          },
          {
            title: "Tipo",
            options: [
              { label: "Entrada", value: "in" },
              { label: "Tranferência", value: "transfer" },
              { label: "Saida", value: "out" },
            ],
            name: "type",
          },
        ]}
      />
      <Table
        fields={fields}
        queryKey={["transaction"]}
        endpoint="/transaction/list"
      />
    </div>
  );
};
export default TransactionPage;
