import Input from "@/components/common/Input";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
interface IProps {
  edit?: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: z.string(),
});

const Form: React.FC<IProps> = ({ edit }) => {
  const [active, setActive] = useState<boolean>(false);
  const popupRef = useRef<HTMLMenuElement>(null);

  const { control, register, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: edit ? edit.first_name + " " + edit.last_name : "",
      email: edit?.email,
      role: edit?.role,
    },
  });

  const handleClose = useCallback((e: MouseEvent) => {
    if (popupRef.current && !popupRef?.current?.contains(e?.target as Node)) {
      popupRef.current.classList.replace("animate-menu-in", "animate-menu-out");
      popupRef.current.children[0].classList.replace(
        "animate-menu-in-content",
        "animate-menu-out-content"
      );
      setTimeout(() => setActive(false), 580);
    }
  }, []);

  //descer e subir no scroll
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  let data = ["Visualizador", "Gerente", "Adiministrador"];

  return (
    <div className="flex flex-col gap-4 mb-2">
      <Input
        {...register("email")}
        label="Email"
        placeholder="Email do usuário"
        type="text"
      />
      <Input
        {...register("name")}
        label="Nome"
        placeholder="Nome do usuário"
        type="text"
      />

      <div className="flex flex-col gap-2 text-sm font-sans relative items-center w-full ">
        <div className="w-full flex flex-1 justify-center z-[5]">
          <Controller
            name="role"
            control={control}
            render={({ field: { onChange, value } }) =>
              !value ? (
                <Input
                  label="Permissão"
                  placeholder="Permissão do usuário"
                  onClick={() => setActive(true)}
                  autoComplete="off"
                />
              ) : (
                <div className="flex flex-col gap-2 text-sm font-sans w-full">
                  <span className="font-semibold">Permissão</span>
                  <div className="w-full bg-zinc-200 rounded-md text-sm py-3 px-5 placeholder:text-zinc-500 flex justify-between">
                    {value}
                    <button
                      type="button"
                      className="h-full flex items-center justify-center"
                      onClick={() => {
                        setValue("role", "");
                        onChange("");
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )
            }
          />

          {active && (
            <menu
              className="w-full p-3 bg-zinc-50 top-[5rem] absolute rounded-xl shadow-md animate-menu-in z-10"
              ref={popupRef}
            >
              <div className="flex flex-col gap-1 animate-menu-in-content overflow-y-auto max-h-32 ">
                {data?.map((item: string) => (
                  <div key={item}>
                    <button
                      className={
                        "py-2 flex justify-center w-full flex-col transition-opacity duration-300"
                      }
                      onClick={() => {
                        setValue("role", item);
                        if (popupRef.current) {
                          popupRef.current.classList.replace(
                            "animate-menu-in",
                            "animate-menu-out"
                          );
                          popupRef.current.children[0].classList.replace(
                            "animate-menu-in-content",
                            "animate-menu-out-content"
                          );
                        }
                        setTimeout(() => setActive(false), 580);
                      }}
                    >
                      <span className="text-sm">{item}</span>
                    </button>
                    {data[2 + 1] && <hr className="border-zinc-300 w-full" />}
                  </div>
                ))}
              </div>
            </menu>
          )}
        </div>
      </div>

      <Input label="Senha" placeholder="Senha do usuário" type="password" />
      <Input
        label="Confirmar senha"
        placeholder="Confirme a senha"
        type="password"
      />
    </div>
  );
};

export default Form;
