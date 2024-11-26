import React, { useCallback, useState } from "react";
import { BoltIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/hooks";
import Actions from "@/helpers/Actions";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface TitleProps {
  type?: string;
  name?: string;
  id?: string;
  shortName?: string;
}

const categorySchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, "Nome deve conter no mínimo 3 caracteres"),
});

const unitSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, "Nome deve conter no mínimo 3 caracteres"),
  short_name: z
    .string({ required_error: "A abreviação é obrigatório" })
    .min(1, "Abreviação deve conter no mínimo 1 caracter"),
});

const TableLine: React.FC<TitleProps> = ({
  type = "category",
  name: initialName = "",
  shortName: initialShortName = "",
  id,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialName);
  const [shortName, setShortName] = useState<string>(initialShortName);
  const oauth = useAppSelector((state) => state.auth.oauth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(type == "category" ? categorySchema : unitSchema),
    defaultValues:
      type == "category" ? { name } : { name, short_name: shortName },
  });

  const submit = useCallback(async (data?: any) => {
    if (!data) return;
    try {
      await new Actions(type != "category" ? "/unit" : "/category", oauth).save(
        data,
        id
      );
      toast({
        title: "Sucesso",
        description: `${
          type != "category" ? `Unidade de medida` : `Categoria`
        } editada com sucesso`,
      });
      setActive(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: `Não foi possivel editar ${
          type != "category" ? `Unidade de medida` : `Categoria`
        }`,
        variant: "destructive",
      });
    }
  }, []);

  return (
    <>
      <div
        className={twMerge(
          "w-full flex flex-row gap-2 px-2 items-center rounded-md",
          active && "bg-zinc-200",
          (errors.name?.message || errors.short_name?.message) &&
            "border border-red-600 outline-red-500 focus-within:outline-1"
        )}
      >
        {active ? (
          <>
            {type === "category" ? (
              <input
                className={twMerge(
                  "w-full rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none bg-zinc-200 px-2 text-m opacity-60 font-semibold focus:opacity-100",
                  errors.name?.message &&
                    "border border-red-600 outline-red-500 focus-within:outline-1"
                )}
                value={name}
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nome da Categoria"
              />
            ) : (
              <div className="grid grid-cols-4 w-full my-1 mx-0 gap-2">
                <input
                  className={twMerge(
                    "col-span-3 w-full px-4 rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none py-1 bg-zinc-200 text-m opacity-60 font-semibold focus:opacity-100",
                    errors.name?.message &&
                      "border border-red-600 outline-red-500 focus-within:outline-1"
                  )}
                  value={name}
                  {...register("name")}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nome"
                />

                <input
                  className={twMerge(
                    "w-full rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none p-1 bg-zinc-200 text-m opacity-60 font-semibold focus:opacity-100",
                    errors.short_name?.message &&
                      "border border-red-600 outline-red-500 focus-within:outline-1"
                  )}
                  value={shortName}
                  {...register("short_name")}
                  onChange={(e) => setShortName(e.target.value)}
                  type="text"
                  placeholder="Nome Abreviado"
                />
              </div>
            )}
          </>
        ) : (
          <div className="w-full">
            {type === "category" ? (
              <span className="text-m opacity-60 font-semibold">{name}</span>
            ) : (
              <div className=" grid grid-cols-4 px-5 py-2 w-full gap-2 text-m opacity-60 font-semibold">
                <span className="col-span-3">{name}</span>
                <span className="px-2">{shortName}</span>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (active) handleSubmit(submit)();
            else setActive(!active);
          }}
          className="py-2"
        >
          {active ? (
            <div className="bg-orange-600 px-2 py-1 rounded-md">
              <span className="text-white">Confirmar</span>
            </div>
          ) : (
            <BoltIcon size={18} className="text-zinc-400" />
          )}
        </button>
      </div>
      {errors.name?.message && errors.short_name?.message && (
        <span className="text-sm text-red-600 ml-2">
          Nome deve conter no mínimo 3 caracteres e abreviação deve conter no
          mínimo 1 caracter
        </span>
      )}
      {errors.name?.message && !errors.short_name?.message && (
        <span className="text-sm text-red-600 ml-2">
          {errors.name?.message}
        </span>
      )}
      {errors.short_name?.message && !errors.name?.message && (
        <span className="text-sm text-red-600 ml-2">
          {errors.short_name?.message}
        </span>
      )}
    </>
  );
};

export default TableLine;
