import Accordion from "@/components/common/Accordion";
import Input from "@/components/common/Input";
import TableLine from "@/components/List/Tableline";
import React from "react";

interface IProps {}

const UnitForm: React.FC<IProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Nome da unidade de medida"
        placeholder="Digite o nome da unidade de medida"
        type="text"
      />
      <Input
        label="Abreviação da unidade de medida"
        placeholder="Digite a abreviação da unidade de medida"
        type="text"
      />
      <Accordion
        fields={[
          {
            title: "Mostrar unidades de medida existentes",
            content: (
              <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
                <TableLine type="unit" name="unidade" shortName="un" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default UnitForm;
