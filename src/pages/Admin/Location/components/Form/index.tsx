import Input from "@/components/common/Input";
import React from "react";

interface IProps {
  edit?: boolean;
}

const Form: React.FC<IProps> = ({ edit }) => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Nome"
        placeholder="Nome do Local"
        type="text"
        value={edit ? "nome do item selecionado" : ""}
      />
    </div>
  );
};

export default Form;
