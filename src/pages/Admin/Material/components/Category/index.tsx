import Accordion from "@/components/common/Accordion";
import Input from "@/components/common/Input";
import TableLine from "@/components/List/Tableline";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

interface IProps {}

const endpoint = "/category/list";

const CategoryForm: React.FC<IProps> = ({}) => {
  const queryKey = useMemo(() => ["search", endpoint], [endpoint]);
  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const res = await new Actions(endpoint, oauth).fetch({
        filters: {},
      });
      return res.data;
    },
  });

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
                {data?.map((item: Record<string, any>, i: number) => (
                  <TableLine name={item.name} type="category" key={i} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default CategoryForm;
