import React from "react";
import Dialog from "..";

interface IProps {
  triggerElement: React.ReactNode;
  submitAction?: (params: any) => void;
}

const Delete: React.FC<IProps> = ({ triggerElement, submitAction }) => {
  return (
    <Dialog
      triggerElement={triggerElement}
      submitAction={submitAction}
      title="Você tem certeza?"
      description="Esta ação não pode ser desfeita. Isso excluirá permanentemente esse registro."
      cancelText="Cancelar"
      submitText="Confirmar"
    />
  );
};

export default Delete;
