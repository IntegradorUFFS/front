import React from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/List/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/List/Table";
import Button from "@/components/common/Button";
import { Tags, Ruler, CirclePlus } from "lucide-react";
import Dialog from "@/components/common/Dialog";
import Form from "./components/Form";
import CategoryForm from "./components/Category";
import UnitForm from "./components/Unit";

const fields = [
  {
    title: "Material",
    keys: ["name"],
    isSortable: true,
  },
  {
    title: "Categoria",
    keys: ["category", "name"],
    isSortable: true,
  },
  {
    title: "Quantidade",
    keys: ["quantity"],
    isSortable: true,
  },
  {
    title: "Unidade",
    keys: ["unit", "short_name"],
  },
];

const queryKey = ["material"];

const MaterialPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const canManage = permissions?.includes("material.management");


  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Material"
        buttons={
          canManage && [
            <Dialog
              triggerElement={<Button icon={<Ruler />} className="p-2" />}
              title="Cadastrar unidade de medida"
              cancelText="Cancelar"
              submitText="Salvar"
            >
              <UnitForm />
            </Dialog>,
            <Dialog
              triggerElement={<Button icon={<Tags />} className="p-2" />}
              title="Cadastrar categoria"
              cancelText="Cancelar"
              submitText="Salvar"
            >
              <CategoryForm />
            </Dialog>,

            <Dialog
              triggerElement={
                <Button
                  icon={<CirclePlus />}
                  className="p-2"
                  text="Cadastrar"
                />
              }
              title="Cadastrar material"
              cancelText="Cancelar"
              submitText="Salvar"
            >
              <Form key="create_material" />
            </Dialog>,
          ]
        }
      />
      <FiltersLine
        queryKey={queryKey}
        filters={[
          {
            title: "Material",
            endpoint: "/material/list",
            name: "name",
            placeholder: "Pesquise o nome do material",
            searchBar: true,
          },
          {
            title: "Categoria",
            endpoint: "/category/autocomplete",
            name: "category_id",
            placeholder: "Pesquise o nome da categoria",
          },
          {
            title: "Unidade de Medida",
            endpoint: "/unit/autocomplete",
            placeholder: "Pesquise o nome da medida",
            name: "unit_id",
          },
        ]}
      />
      <Table
        fields={fields}
        onEdit={canManage}
        queryKey={queryKey}
        endpoint="/material/list"
        titleEdit="Editar Material"
        formEdit={<Form key="edit_material" />}
      />
    </div>
  );
};
export default MaterialPage;
