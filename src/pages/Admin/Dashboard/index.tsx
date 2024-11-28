import React, { useMemo, useState } from "react";
import TitleLine from "@/components/TitleLine";
import Button from "@/components/common/Button";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import Actions from "@/helpers/Actions";
import BarLineChart from "@/components/ui/barChart";

const DashboardPage: React.FC = () => {
  const endpoint = "/transaction/list";

  const [selectedButton, setSelectedButton] = useState<number>(20);

  const queryKey = useMemo(() => ["search", selectedButton], [selectedButton]);
  const oauth = useAppSelector((state) => state.auth.oauth);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!oauth) throw new Error("OAuth not found");
      const res = await new Actions(endpoint, oauth).fetch({
        per_page: selectedButton,
      });
      return res.data;
    },
  });

  const handleButtonClick = (value: number) => {
    setSelectedButton(value);
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-4">
        <TitleLine title="Dashboard" />
      </div>
      <div className="flex flex-row gap-2 w-fit bg-zinc-200 p-1.5 rounded-lg">
        <Button
          text="20"
          className={`h-8 px-6 rounded-lg ${
            selectedButton === 20 ? "bg-white" : "bg-zinc-200"
          }`}
          onClick={() => handleButtonClick(20)}
        />
        <Button
          text="50"
          className={`h-8 px-6 rounded-lg ${
            selectedButton === 50 ? "bg-white" : "bg-zinc-200"
          }`}
          onClick={() => handleButtonClick(50)}
        />
        <Button
          text="100"
          className={`h-8 px-6 rounded-lg ${
            selectedButton === 100 ? "bg-white" : "bg-zinc-200"
          }`}
          onClick={() => handleButtonClick(100)}
        />
      </div>
      {isLoading ? (
        <>
          <div className="grid grid-cols-5 gap-8 m-4">
            <div className="h-100 bg-zinc-200 rounded-md animate-pulse col-span-3 my-4 opacity-40"></div>
            <div className="h-100 bg-zinc-200 rounded-md animate-pulse col-span-2 my-4 opacity-40"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-64 bg-zinc-200 rounded-md animate-pulse my-4 opacity-40"></div>
            <div className="h-64 bg-zinc-200 rounded-md animate-pulse my-4 opacity-40"></div>
          </div>
        </>
      ) : (
        <>
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
                <>
                  {data
                    ?.filter(
                      (item: Record<string, any>) => item.type == "transfer"
                    )
                    .map((item: Record<string, any>, index: number) => (
                      <div
                        className="grid grid-cols-7 my-1"
                        key={`transfer-${index}`}
                      >
                        <span className="text-base col-span-2">
                          {item.material.name}
                        </span>
                        <span className="text-base col-span-1 text-center">
                          {item.quantity}
                        </span>
                        <span className="text-base col-span-2 text-center">
                          {item.origin.name}
                        </span>
                        <span className="text-base col-span-2 text-center">
                          {item.destiny.name}
                        </span>
                      </div>
                    ))}
                </>
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
                <>
                  {data
                    ?.filter((item: Record<string, any>) => item.type == "in")
                    .map((item: Record<string, any>, index: number) => (
                      <div
                        className="grid grid-cols-4 my-1"
                        key={`in-${index}`}
                      >
                        <span className="text-base col-span-2">
                          {item.material.name}
                        </span>
                        <span className="text-base col-span-1 text-center">
                          {item.quantity}
                        </span>
                        <span className="text-base col-span-1 text-center">
                          {item.destiny.name}
                        </span>
                      </div>
                    ))}
                </>
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
                <>
                  {data
                    ?.filter((item: Record<string, any>) => item.type == "out")
                    .map((item: Record<string, any>, index: number) => (
                      <div
                        className="grid grid-cols-4 my-1"
                        key={`out-${index}`}
                      >
                        <span className="text-base col-span-2">
                          {item.material.name}
                        </span>
                        <span className="text-base col-span-1 text-center">
                          {item.quantity}
                        </span>
                        <span className="text-base col-span-1 text-center">
                          {item.origin.name}
                        </span>
                      </div>
                    ))}
                </>
              </div>
            </div>
          </div>
        </>
      )}
      ;
    </div>
  );
};
export default DashboardPage;
