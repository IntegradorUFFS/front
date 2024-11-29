import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
    .min(0.000000001, "Quantidade inválida")
    .transform((value) => Number(value)),
  origin_id: z.string({
    required_error: "Local de origem obrigatória",
    invalid_type_error: "Local de origem inválida",
  }),
  destiny_id: z.string({
    required_error: "Local de destino obrigatório",
    invalid_type_error: "Local de destino inválido",
  }),
});
const queryKey = ["out", "quantity"];
const Form: React.FC = () => {
  const queryClient = useQueryClient();
  const oauth = useAppSelector((state) => state.auth.oauth);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      material_id: undefined,
      quantity: null,
      origin_id: undefined,
      destiny_id: undefined,
    },
  });

  const material_id = watch("material_id");
  const location_id = watch("origin_id");

  const { data, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      if (!material_id || !location_id)
        throw new Error("Material or location not found");
      const res = await new Actions("/location-material/relation", oauth).fetch(
        {
          extra_params: { location_id, material_id },
        }
      );
      return res.data;
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, 300);
    return () => clearTimeout(timeout);
  }, [material_id, location_id, queryClient]);

  const submit = useCallback(
    async (data?: any) => {
      if (!data) return;
      try {
        await new Actions("/transaction", oauth).save(data);
        toast({
          title: "Sucesso",
          description: "Transferencia do material cadastrada com sucesso",
        });
        reset();
      } catch {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar transferencia do material",
          variant: "destructive",
        });
      }
    },
    [oauth, reset]
  );

  return (
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
        label="Local de origem"
        endpoint="/location"
        placeholder={
          !material_id
            ? "Campo indisponivel no momento"
            : "Digite o nome do local de origem"
        }
        control={control}
        queryKey={["origin-autocomplete"]}
        name="origin_id"
        disabled={!material_id}
        getOptionLabel={(option) => option.name}
        extraFilter={{ "filter[material_id]": material_id }}
      />

      <Autocomplete
        label="Local de destino"
        endpoint="/location"
        placeholder="Digite o nome do local de destino"
        control={control}
        queryKey={["destiny-autocomplete"]}
        getOptionLabel={(option) => option.name}
        name="destiny_id"
      />
      <Input
        label="Quantidade"
        placeholder="Digite a quantidade"
        type="quantity"
        qtd={
          location_id && material_id && data && !isFetching
            ? data?.quantity
            : "-"
        }
        disabled={!location_id}
        {...register("quantity")}
        error={errors.quantity?.message}
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
    </div>
  );
};

export default Form;
