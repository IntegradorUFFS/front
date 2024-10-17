import React from "react";
import Dialog from "..";

interface IProps {
  triggerElement: React.ReactNode;
  submitAction?: (params: any) => void;
  children?: React.ReactNode;
  title: string;
}

const Register: React.FC<IProps> = ({
  triggerElement,
  submitAction,
  children,
  title,
}) => {
  return (
    <Dialog
      triggerElement={triggerElement}
      submitAction={submitAction}
      title={title}
      children={children}
      cancelText="Cancelar"
      submitText="Confirmar"
    />
  );
};

export default Register;
