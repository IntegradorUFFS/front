import React, { useState } from "react";
import { BoltIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  type?: string;
  name?: string;
  shortName?: string;
}

const TableLine: React.FC<TitleProps> = ({
  type = "category",
  name: initialName = "",
  shortName: initialShortName = "",
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialName);
  const [shortName, setShortName] = useState<string>(initialShortName);

  return (
    <>
      <div
        className={twMerge(
          "w-full flex flex-row gap-2 px-2 items-center rounded-md",
          active && "bg-zinc-200"
        )}
      >
        {active ? (
          <>
            {type === "category" ? (
              <input
                className="w-full rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none bg-zinc-200 bg-zinc-200 px-2 text-m opacity-60 font-semibold focus:opacity-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nome da Categoria"
              />
            ) : (
              <div className="flex grid grid-cols-4 w-full my-1 mx-0 gap-2">
                <input
                  className="col-span-3 w-full px-4 rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none py-1 bg-zinc-200 text-m opacity-60 font-semibold focus:opacity-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Nome"
                />
                <input
                  className="w-full rounded-md text-sm border border-zinc-400 focus:border-zinc-600 focus:outline-none p-1 bg-zinc-200 text-m opacity-60 font-semibold focus:opacity-100"
                  value={shortName}
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
              <div className="flex grid grid-cols-4 px-5 py-2 w-full gap-2 text-m opacity-60 font-semibold">
                <span className="col-span-3">{name}</span>
                <span className="px-2">{shortName}</span>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setActive(!active)}
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
    </>
  );
};

export default TableLine;
