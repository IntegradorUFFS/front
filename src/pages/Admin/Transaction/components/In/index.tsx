import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import Actions from "@/helpers/Actions";
import Autocomplete from "@/components/common/Autocomplete";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  material_id: z.string({
    required_error: "Material obrigatório",
    invalid_type_error: "Material invalido",
  }),
  quantity: z
    .string({
      required_error: "Quantidade obrigatória",
      invalid_type_error: "Quantidade inválida",
    })
    .min(0.000000000000001, "Quantidade inválida")
    .transform((value) => Number(value)),
  destiny_id: z.string({
    required_error: "Local de destino obrigatório",
    invalid_type_error: "Local de destino inválido",
  }),
});

const In: React.FC = () => {
  const oauth = useAppSelector((state) => state.auth.oauth);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      material_id: undefined,
      quantity: undefined,
      destiny_id: undefined,
    },
  });

  const submit = useCallback(async (data?: any) => {
    if (!data) return;
    try {
      await new Actions("/transaction", oauth).save(data);
      toast({
        title: "Sucesso",
        description: "Entrada de material cadastrada com sucesso",
      });
      reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar entrada de material",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-2">
      <div className="flex flex-col gap-4">
        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
        <Autocomplete
          label="Material"
          endpoint="/material"
          placeholder="Digite o nome do material"
          control={control}
          queryKey={["material-autocomplete"]}
          name="material_id"
          getOptionLabel={(option) => option.name}
        />
        <Autocomplete
          label="Local"
          endpoint="/location"
          placeholder="Digite o nome do local de destino"
          control={control}
          queryKey={["location-autocomplete"]}
          name="destiny_id"
          getOptionLabel={(option) => option.name}
        />
        <Input
          label="Quantidade"
          placeholder="Digite a quantidade"
          type="number"
          {...register("quantity")}
          error={errors.quantity?.message as string}
        />
        <div className="flex flex-row justify-center">
          <Button
            type="submit"
            onClick={handleSubmit(submit)}
            text="Registrar"
            className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
            variant="filled"
          />
        </div>
        <div className="h-0.5 bg-zinc-200 col-span-2"></div>
      </div>
    </div>
  );
};

export default In;
