import Input from "@/components/common/Input";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IProps {
  edit?: {
    name: string;
  };
  setSubmitAction?: (params: any) => void;
}

const schema = z.object({
  name: z.string(),
});

const Form: React.FC<IProps> = ({ edit, setSubmitAction }) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
    },
  });

  const submit = useCallback((handleClose?: any) => {
    const save = async (data: any) => {
      handleClose && handleClose();
    };
    handleSubmit(save)();
  }, []);

  useEffect(() => {
    setSubmitAction && setSubmitAction(submit);
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("name")}
        label="Nome"
        placeholder="Nome do Local"
        type="text"
      />
    </div>
  );
};

export default Form;
