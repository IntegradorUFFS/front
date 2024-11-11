import Accordion from "@/components/common/Accordion";
import Input from "@/components/common/Input";
import TableLine from "@/components/List/Tableline";
import React from "react";

interface IProps {}

const CategoryForm: React.FC<IProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Nome da Categoria"
        placeholder="Digite o nome da categoria"
        type="text"
      />
      <Accordion
        fields={[
          {
            title: "Mostrar categorias existentes",
            content: (
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
                <TableLine type="category" name="carlos 1" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CategoryForm;
