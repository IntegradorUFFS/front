import Accordion from "@/components/common/Accordion";
import Select from "@/components/common/Select";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";

interface IProps {}

const schema = z.object({
  material_id: z.string(),
  material_quantity_id: z.string(),
  origin_id: z.string(),
  destiny_id: z.string(),
});

const Form: React.FC<IProps> = ({}) => {
  const materialEndpoint = "/material/list";
  const queryKey = useMemo(
    () => ["search", materialEndpoint],
    [materialEndpoint]
  );
  const oauth = useAppSelector((state) => state.auth.oauth);
  const { control, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  // const { data, isLoading } = useQuery({
  //   queryKey,
  //   queryFn: async () => {
  //     if (!oauth) throw new Error("OAuth not found");
  //     const search = getValues("search");
  //     const res = await new Actions(materialEndpoint, oauth).fetch({
  //       filters: { name: search },
  //     });
  //     return res.data;
  //   },
  // });

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Accordion
        fields={[
          {
            title: "Entrada de insumos",
            content: (
              <div className="flex flex-col gap-4">
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>

                <Select control={control} label="Material" options={[]} />

                <Select control={control} label="Local" options={[]} />
                <Input
                  label="Quantidade"
                  placeholder="Quantidade"
                  type="quantity"
                  qtd={1}
                />
                <div className="flex flex-row justify-center">
                  <Button
                    type="submit"
                    onClick={() => {}}
                    text="Registrar"
                    className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
                    variant="filled"
                  />
                </div>
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>
              </div>
            ),
          },
          {
            title: "Transferência de insumos entre locais",
            content: (
              <div className="flex flex-col gap-4">
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>
                <Select control={control} label="Material" options={[]} />
                <Select
                  control={control}
                  label="Local de origem"
                  options={[]}
                />
                <Input
                  label="Quantidade"
                  placeholder="Quantidade"
                  type="quantity"
                  qtd={1}
                />
                <Select
                  control={control}
                  label="Local de destino"
                  options={[]}
                />
                <div className="flex flex-row justify-center">
                  <Button
                    type="submit"
                    onClick={() => {}}
                    text="Registrar"
                    className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
                    variant="filled"
                  />
                </div>
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>
              </div>
            ),
          },
          {
            title: "Saída de insumos",
            content: (
              <div className="flex flex-col gap-4">
                <div className="h-0.5 bg-zinc-200 col-span-2"></div>
                <Select control={control} label="Material" options={[]} />
                <Select control={control} label="Local" options={[]} />
                <Input
                  label="Quantidade"
                  placeholder="Quantidade"
                  type="quantity"
                  qtd={1}
                />
                <div className="flex flex-row justify-center">
                  <Button
                    type="submit"
                    onClick={() => {}}
                    text="Registrar"
                    className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
                    variant="filled"
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Form;
