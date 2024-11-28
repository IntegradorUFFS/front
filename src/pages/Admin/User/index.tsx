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
    title: "Nome",
    keys: ["first_name"],
    isSortable: true,
    transform: (first_name: string, item: any) =>
      `${first_name} ${item.last_name}`,
  },
  {
    title: "Email",
    keys: ["email"],
    isSortable: false,
  },
  {
    title: "Permissão",
    keys: ["role"],
    isSortable: true,
    transform: (item: any) => {
      switch (item) {
        case "viewer":
          return "Visualizador";
        case "admin":
          return "Administrador";
        case "manager":
          return "Gerente";
        default:
          return "Algo deu errado";
      }
    },
  },
];

const queryKey = ["user"];

const UserPage: React.FC = () => {
  const permissions = useAppSelector((state) => state.auth.permissions);
  const oauth = useAppSelector((state) => state.auth.oauth);
  const role = useAppSelector((state) => state.auth.role);
  const canManage = permissions?.includes("user.management");
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
      const res = await new Actions("/user", oauth).delete(id);
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
        title="Usuários"
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
              title="Cadastrar Usuário"
              cancelText="Cancelar"
              submitText="Salvar"
            >
              <Form key={"create"} />
            </Dialog>,
          ]
        }
      />
      <FiltersLine
        queryKey={["user"]}
        filters={[
          {
            title: "Nome de Usuário",
            endpoint: "/user/list",
            searchBar: true,
            name: "user_id",
            placeholder: "Pesquise o nome de Usuário",
          },
          {
            title: "Permissão",
            options: [
              { label: "Visualizador", value: "viewer" },
              { label: "Gerente", value: "manager" },
              { label: "Adiministrador", value: "admin" },
            ],
            name: "user_role",
          },
        ]}
      />

      <Table
        fields={fields}
        onEdit={() => {
          console.log();
        }}
        onDelete={canManage && handleDelete}
        queryKey={["user"]}
        endpoint="/user/list"
        titleEdit="Editar Usuário"
        formEdit={<Form key={"edit"} />}
        rowValidation={(item) => item?.role !== role}
      />
    </div>
  );
};
export default UserPage;
