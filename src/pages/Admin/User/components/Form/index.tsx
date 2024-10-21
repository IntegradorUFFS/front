import Input from "@/components/common/Input";
import React from "react";

interface IProps {
  edit?: boolean;
}

const Form: React.FC<IProps> = ({ edit }) => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Email"
        placeholder="Email do usuário"
        type="text"
        value={edit ? "nome do item selecionado" : ""}
      />
      <Input
        label="Senha"
        placeholder="Senha do usuário"
        type="password"
        value={edit ? "nome do item selecionado" : ""}
      />
      <Input
        label="Nome"
        placeholder="Nome do usuário"
        type="text"
        value={edit ? "nome do item selecionado" : ""}
      />
      Autocomplete
    </div>
  );
};

export default Form;
