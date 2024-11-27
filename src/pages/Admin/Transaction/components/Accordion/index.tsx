import Accordion from "@/components/common/Accordion";
import React from "react";
import Out from "../Out";
import Transfer from "../Transfer";
import In from "../In";

const Form: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Accordion
        fields={[
          {
            title: "Entrada de insumos",
            content: <In />,
          },
          {
            title: "Transferência de insumos entre locais",
            content: <Transfer />,
          },
          {
            title: "Saída de insumos",
            content: <Out />,
          },
        ]}
      />
    </div>
  );
};

export default Form;
