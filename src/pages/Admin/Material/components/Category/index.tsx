import Accordion from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TableLine from "@/components/List/Tableline";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IProps {
  handleClose?: () => void;
}

const schema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, "Nome deve conter no mínimo 3 caracteres"),
});

const CategoryForm: React.FC<IProps> = ({ handleClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const endpoint = "/category/list";
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

  const submit = useCallback(
    async (data?: any) => {
      if (!data) return;
      try {
        await new Actions("/category", oauth).save(data);
        toast({
          title: "Sucesso",
          description: "Categoria cadastrada com sucesso",
        });
        if (handleClose) handleClose();
      } catch  {
        toast({
          title: "Erro",
          description: "Não foi possível cadastrar a categoria",
          variant: "destructive",
        });
      }
    },
    [handleClose, oauth]
  );

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("name")}
        label="Nome da Categoria"
        placeholder="Digite o nome da categoria"
        type="text"
        error={errors.name?.message}
      />
      <Accordion
        fields={[
          {
            title: "Mostrar categorias existentes",
            content: (
              <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
                {data?.map((item: Record<string, any>, i: number) => (
                  <TableLine
                    name={item.name}
                    type="category"
                    id={item.id}
                    key={i}
                  />
                ))}
              </div>
            ),
          },
        ]}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          text="Salvar"
          className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
          variant="filled"
        />
      </div>
    </div>
  );
};

export default CategoryForm;
