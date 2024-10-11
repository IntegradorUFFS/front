import React from "react";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { Tags, CirclePlus } from "lucide-react";
import { title } from "process";

const fields = [
  {
    title: "Material",
    keys: ["nome"],
  },
  {
    title: "Categoria",
    keys: ["category", "name"],
  },
];

const data = [
  {
    nome: "teste",
    category: {
      name: "teste",
    },
  },
  {
    nome: "teste2",
    category: {
      name: "teste2",
    },
  },
];

const MaterialPage: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="material"
        buttons={[
          <Button onClick={console.log} icon={<Tags />} />,
          <Button
            onClick={console.log}
            icon={<CirclePlus />}
            text="Cadastrar"
            className="w-fit"
          />,
        ]}
      />
      <FiltersLine possibleFilters={[]} />
      <Table
        data={data}
        fields={fields}
      />
    </div>
  );
};
export default MaterialPage;
