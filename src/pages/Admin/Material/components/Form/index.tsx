import Autocomplete from "@/components/common/Autocomplete";
import Input from "@/components/common/Input";
import React from "react";

const Form: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input label="Nome" placeholder="Nome do material" type="text" />
      <Autocomplete
        label="Categoria"
        placeholder="tetse"
        queryKey={["material-autopcomplete"]}
        endpoint="/material"
        getOptionLabel={(option) => option.name}
      />
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2">
          <Input label="Quantidade" placeholder="Quantidade" type="number" />
        </div>
        <Input label="Unidade" placeholder="Unidade" type="text" />
      </div>
      <Input label="Descrição" placeholder="Descrição" type="text" />
    </div>
  );
};

export default Form;
