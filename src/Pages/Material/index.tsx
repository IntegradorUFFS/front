import React from "react";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";

const MaterialPage: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <TitleLine>Materiais</TitleLine>
      <FiltersLine possibleFilters={[]} />
    </div>
  );
};
export default MaterialPage;
