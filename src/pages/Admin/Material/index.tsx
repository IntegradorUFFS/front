import React, { useCallback } from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/List/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/List/Table";
import Button from "@/components/common/Button";
import { Tags, CirclePlus } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import extractErrors from "@/helpers/extractErrors";
import helpMessages from "@/helpers/helpMessages";
import Actions from "@/helpers/Actions";
import { useToast } from "@/hooks/use-toast";
import Register from "@/components/common/Dialog/Register";
import Input from "@/components/common/Input";
import Dataset from "@/components/common/Dataset";

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

  const oauth = useAppSelector((state) => state.auth.oauth);
  const canManage = permissions?.includes("material.management");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      id,
      callback,
    }: {
      id: string;
      callback: () => void;
    }) => {
      if (!oauth) throw new Error("OAuth not found");
      await new Actions("/material", oauth).delete(id);
      queryClient.invalidateQueries({ queryKey });
      return callback;
    },
    onSuccess(_, variables) {
      variables.callback();
    },
    onError: (err) => {
      const { field, error } = extractErrors(err);
      if (field) return;

      toast({
        title: "Erro",
        description: helpMessages(error) || "Algo deu errado",
        variant: "destructive",
      });
    },
  });

  const handleDelete = useCallback(
    async (item: Record<string, any>, callback: () => void) => {
      await mutateAsync({ id: item.id, callback });
    },
    [mutateAsync]
  );

  const handleRegister = useCallback(() => {
    console.log("register");
  }, []);

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Material"
        buttons={
          canManage && [
            <Button onClick={console.log} icon={<Tags />} className="p-2" />,
            <Register
              triggerElement={
                <Button
                  icon={<CirclePlus />}
                  className="p-2"
                  text="Cadastrar"
                />
              }
              submitAction={handleRegister}
              title="Cadastrar Material"
              children={
                <div className="flex flex-col gap-4 mb-2">
                  <Input
                    label="Nome"
                    placeholder="Nome do material"
                    type="text"
                  />
                  <Dataset />
                  <div className="grid grid-cols-3 gap-4 ">
                    <div className="col-span-2">
                      <Input
                        label="Quantidade"
                        placeholder="Quantidade"
                        type="number"
                      />
                    </div>
                    <Input label="Unidade" placeholder="Unidade" type="text" />
                  </div>
                  <Input
                    label="Descrição"
                    placeholder="Descrição"
                    type="text"
                  />
                </div>
              }
            />,
          ]
        }
      />
      <FiltersLine possibleFilters={[]} queryKey={queryKey} />
      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={canManage && handleDelete}
        queryKey={queryKey}
        endpoint="/material/list"
      />
    </div>
  );
};
export default MaterialPage;
