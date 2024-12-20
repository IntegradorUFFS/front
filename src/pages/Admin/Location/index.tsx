import React, { useCallback } from "react";
import { useAppSelector } from "@/hooks";
import FiltersLine from "@/components/List/FiltersLine";
import TitleLine from "@/components/TitleLine";
import Table from "@/components/List/Table";
import Button from "@/components/common/Button";
import { CirclePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import extractErrors from "@/helpers/extractErrors";
import helpMessages from "@/helpers/helpMessages";
import Form from "./components/Form";
import Dialog from "@/components/common/Dialog";

const fields = [
  {
    title: "Local",
    keys: ["name"],
    isSortable: true,
  },
];

const queryKey = ["location"];

const LocationPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const oauth = useAppSelector((state) => state.auth.oauth);
  const canManage = permissions?.includes("location.management");
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
      const res = await new Actions("/location", oauth).delete(id);
      queryClient.invalidateQueries({ queryKey });
      callback();
      return res;
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

  return (
    <div className="flex-1 p-6">
      <TitleLine
        title="Locais"
        buttons={
          canManage && [
            <Dialog
              triggerElement={
                <Button
                  icon={<CirclePlus />}
                  className="p-2"
                  text="Cadastrar"
                />
              }
              title="Cadastrar Local"
              cancelText="Cancelar"
              submitText="Salvar"
            >
              <Form />
            </Dialog>,
          ]
        }
      />
      <FiltersLine
        filters={[
          {
            title: "Local",
            placeholder: "Pesquise o local",
            searchBar: true,
            endpoint: "/location/list",
            name: "name",
          },
        ]}
        queryKey={["location"]}
      />
      <Table
        fields={fields}
        onEdit={canManage}
        onDelete={canManage && handleDelete}
        queryKey={["location"]}
        endpoint="/location/list"
        titleEdit="Editar Local"
        formEdit={<Form />}
      />
    </div>
  );
};
export default LocationPage;
