import Input from "@/components/common/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IProps {
  edit?: {
    name: string;
  };
}

const schema = z.object({
  name: z.string(),
});

const Form: React.FC<IProps> = ({ edit }) => {
  const { register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit?.name,
    },
  });
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
