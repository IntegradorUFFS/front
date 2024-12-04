import Accordion from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TableLine from "@/components/List/Tableline";
import Actions from "@/helpers/Actions";
import { useAppSelector } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  short_name: z
    .string({ required_error: "A abreviação é obrigatório" })
    .min(1, "Abreviação deve conter no mínimo 1 caracter"),
});

const UnitForm: React.FC<IProps> = ({ handleClose }) => {
  const endpoint = "/unit/list";
  const queryKey = useMemo(() => ["search", endpoint], [endpoint]);
  const oauth = useAppSelector((state) => state.auth.oauth);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", short_name: "" },
  });

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
        await new Actions("/unit", oauth).save(data);
        toast({
          title: "Sucesso",
          description: "Unidade de medida cadastrada com sucesso",
        });
        queryClient.invalidateQueries( {queryKey } );
        if (handleClose) handleClose();
      } catch {
        toast({
          title: "Erro",
          description: "Não foi possível cadastrar a unidade de medida",
          variant: "destructive",
        });
      }
    },
    [handleClose, oauth]
  );

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        label="Nome da unidade de medida"
        placeholder="Digite o nome da unidade de medida"
        type="text"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Abreviação da unidade de medida"
        placeholder="Digite a abreviação da unidade de medida"
        type="text"
        {...register("short_name")}
        error={errors.short_name?.message}
      />
      <Accordion
        fields={[
          {
            title: "Mostrar unidades de medida existentes",
            content: (
              <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
                {data?.map((item: Record<string, any>, i: number) => (
                  <TableLine
                    name={item.name}
                    shortName={item.short_name}
                    type="unit"
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

export default UnitForm;
