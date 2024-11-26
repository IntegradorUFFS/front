import React from "react";
import FiltersLine from "@/components/List/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/List/Table";

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
      <FiltersLine
        queryKey={["location-material"]}
        filters={[
          {
            title: "Material",
            endpoint: "/material/list",
            searchBar: true,
            name: "material_id",
          },
          { title: "Local", endpoint: "/location/list", name: "location_id" },
        ]}
      />
      <Table
        fields={fields}
        queryKey={["location-material"]}
        endpoint="/location-material/list"
      />
    </div>
  );
};
export default LocationMaterialPage;
