import React from "react";
import FiltersLine from "@/components/topSide/FiltersLine";
import TitleLine from "@/components/topSide/TitleLine";
import Table from "@/components/botSide/Table";

const fields = [
  {
    title: "Material",
    keys: ["material", "name"],
    isSortable: true,
  },
  {
    title: "Local",
    keys: ["location", "name"],
    isSortable: true,
  },
  {
    title: "Quantidade",
    keys: ["quantity"],
    isSortable: true,
  },
];

const LocationMaterialPage: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <TitleLine title="Estoque" />
      <FiltersLine possibleFilters={[]} queryKey={["location-material"]} />
      <Table
        fields={fields}
        queryKey={["location-material"]}
        endpoint="/location-material/list"
      />
    </div>
  );
};
export default LocationMaterialPage;
