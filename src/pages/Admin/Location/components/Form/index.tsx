import Input from "@/components/common/Input";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/common/Button";

interface IProps {
  edit?: {
    name: string;
  };
  handleClose?: () => void;
}

const schema = z.object({
  name: z.string(),
});

const Form: React.FC<IProps> = ({ edit, handleClose }) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
    },
  });

  const submit = useCallback(
    (data?: any) => {
      if (handleClose) handleClose();
    },
    [handleClose]
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        {...register("name")}
        label="Nome"
        placeholder="Nome do Local"
        type="text"
      />
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          onClick={handleSubmit(submit)}
          text="Salvar"
          className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
          variant="filled"
        />
      </div>
    </div>
  );
};

export default Form;
