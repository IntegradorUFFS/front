import React, { useEffect, useMemo, useState } from "react";
import TitleLine from "@/components/TitleLine";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import BarLineChart from "@/components/ui/barChart";

const DashboardPage: React.FC = () => {
  const endpoint = "/transaction/list";

  const queryKey = useMemo(() => ["search", endpoint], [endpoint]);
  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const res = await new Actions(endpoint, oauth).fetch({
        filters: {},
      });
      return res.data;
    },
  });

  return (
    <div className="flex-1 p-6">
      <div className="mb-4">
        <TitleLine title="Dashboard" />
      </div>
      <div className="flex flex-row gap-2 w-fit bg-zinc-200 p-1.5 rounded-lg">
        <Button
          text="20"
          className="bg-white h-8 px-6 rounded-lg"
          onClick={() => {}}
        />
        <Button text="50" className=" h-8 px-6 rounded-lg" onClick={() => {}} />
        <Button
          text="100"
          className=" h-8 px-6 rounded-lg"
          onClick={() => {}}
        />
      </div>
      <div className="grid grid-cols-5 gap-8">
        {/* GRAFICO */}

        <div className="h-fit w-full border-2 border-zinc-200 rounded-lg my-4 flex justify-center p-2 col-span-3">
          {data && data?.length > 0 && <BarLineChart data={data} />}
        </div>

        {/* Tansferencias */}

        <div className="h-100 w-full border-2 border-zinc-200 rounded-lg my-4 p-4 flex flex-col col-span-2">
          <span className="text-xl font-semibold py-1">Transferencias</span>

          <div className="grid grid-cols-7 py-1 px-2 bg-zinc-200 rounded-md">
            <span className="col-span-2">Material</span>
            <span className="col-span-1 text-center">Quantidade</span>
            <span className="col-span-2 text-center">Origem</span>
            <span className="col-span-2 text-center">Destino</span>
          </div>
          <div className="flex flex-col gap-2 p-2 max-h-fit overflow-y-auto">
            <div className="grid grid-cols-7 gap-2">
              {data
                ?.filter((item: Record<string, any>) => item.type == "transfer")
                .map((item: Record<string, any>) => (
                  <>
                    <span className="text-base col-span-2">
                      {item.material.name}
                    </span>
                    <span className="text-base col-span-1 text-center">
                      {item.material.quantity}
                    </span>
                    <span className="text-base col-span-2 text-center">
                      {item.origin.name}
                    </span>
                    <span className="text-base col-span-2 text-center">
                      {item.destiny.name}
                    </span>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entrada */}

      <div className="flex flex-row gap-8">
        <div className="h-64 w-full border-2 border-zinc-200 rounded-lg my-4 p-4 flex flex-col">
          <span className="text-xl font-semibold py-1">Entrada</span>

          <div className="grid grid-cols-4 py-1 px-2 bg-zinc-200 rounded-md">
            <span className="col-span-2">Material</span>
            <span className="col-span-1 text-center">Quantidade</span>
            <span className="col-span-1 text-center">Local</span>
          </div>
          <div className="flex flex-col gap-2 p-2 max-h-fit overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {data
                ?.filter((item: Record<string, any>) => item.type == "in")
                .map((item: Record<string, any>) => (
                  <>
                    <span className="text-base col-span-2">
                      {item.material.name}
                    </span>
                    <span className="text-base col-span-1 text-center">
                      {item.material.quantity}
                    </span>
                    <span className="text-base col-span-1 text-center">
                      {item.destiny.name}
                    </span>
                  </>
                ))}
            </div>
          </div>
        </div>

        {/* SAIDA */}

        <div className="h-64 w-full border-2 border-zinc-200 rounded-lg my-4 p-4 flex flex-col">
          <span className="text-xl font-semibold py-1">Saída</span>
          <div className="grid grid-cols-4 py-1 px-2 bg-zinc-200 rounded-md">
            <span className="col-span-2">Material</span>
            <span className="col-span-1 text-center">Quantidade</span>
            <span className="col-span-1 text-center">Local</span>
          </div>
          <div className="flex flex-col gap-2 p-2 max-h-fit overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {data
                ?.filter((item: Record<string, any>) => item.type == "out")
                .map((item: Record<string, any>) => (
                  <>
                    <span className="text-base col-span-2">
                      {item.material.name}
                    </span>
                    <span className="text-base col-span-1 text-center">
                      {item.material.quantity}
                    </span>
                    <span className="text-base col-span-1 text-center">
                      {item.origin.name}
                    </span>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;