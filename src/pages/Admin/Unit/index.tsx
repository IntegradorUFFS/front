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

const fields = [
  {
    title: "Nome",
    keys: ["name"],
    isSortable: true,
  },
  {
    title: "Unidade",
    keys: ["short_name"],
    isSortable: false,
  },
];

const queryKey = ["unit"];

const UnitPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const oauth = useAppSelector((state) => state.auth.oauth);
  const canManage = permissions?.includes("unit.management");
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
      const res = await new Actions("/unit", oauth).delete(id);
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
        title="Unidade Métricas"
        buttons={
          canManage && [
            <Button
              onClick={console.log}
              icon={<CirclePlus />}
              text="Cadastrar"
              className="w-fit py-2 px-3"
            />,
          ]
        }
      />
      <FiltersLine possibleFilters={[]} queryKey={["unit"]} />
      <Table
        fields={fields}
        onEdit={console.log}
        onDelete={canManage && handleDelete}
        queryKey={["unit"]}
        endpoint="/unit/list"
      />
    </div>
  );
};
export default UnitPage;
