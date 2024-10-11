import React from "react";
import FiltersLine from "@/components/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/Table";

const MaterialPage: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <TitleLine title="material" />
      <FiltersLine possibleFilters={[]} />
      <Table/>
    </div>
  );
};
export default MaterialPage;
