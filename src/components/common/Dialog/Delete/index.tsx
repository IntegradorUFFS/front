import React from "react";
import Dialog from "..";
import Button from "../../Button";

interface IProps {
  triggerElement?: React.ReactNode;
  submitAction?: (params: any) => void;
}

const DeleteContainer: React.FC<IProps> = ({
  handleClose,
  submitAction,
}: {
  handleClose?: () => void;
  submitAction?: (params: any) => void;
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="submit"
        onClick={() => submitAction && submitAction(handleClose)}
        text="Salvar"
        className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
        variant="filled"
      />
    </div>
  );
};

const Delete: React.FC<IProps> = ({ triggerElement, submitAction }) => {
  return (
    <Dialog
      triggerElement={triggerElement}
      title="Você tem certeza?"
      description="Esta ação não pode ser desfeita. Isso excluirá permanentemente esse registro."
      cancelText="Cancelar"
      submitText="Confirmar"
    >
      <DeleteContainer submitAction={submitAction} />
    </Dialog>
  );
};

export default Delete;
