import React from "react";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { Tags, CirclePlus } from "lucide-react";

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
        items={["teste", "teste", "teste", "teste", "teste"]}
        dataLine={[]}
      />
    </div>
  );
};
export default MaterialPage;
