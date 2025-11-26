import { CalendarRange } from "lucide-react";
import { useAppDispatch } from "@/hooks";

import Filter from "@/components/List/components/Filter";
import Notifications from "@/components/List/components/Notifications";
import Sort from "@/components/List/components/Sort";
import { useEffect } from "react";

export default function Landing() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "layout/setBreadcrumb", payload: "Visão Geral" });
  }, [dispatch]);
  return (
    <>
      <div className="max-h-screen overflow-y-auto">
        <div className="px-6 pb-8 min-w-fit">
          {/* <PageHeader title="Visão Geral" /> */}
          <div className="mb-8 flex items-center justify-between w-full gap-6">
            <div className="rounded-2xl border border-neutral-4 px-3 py-2 shadow-xs max-w-[540px] min-w-[300px] w-full flex items-center justify-start gap-3">
              <img
                src="/assets/ix_ai.svg"
                alt="AI icon"
                width={24}
                height={24}
              />
              <input
                type="text"
                className="bg-transparent min-w-60 w-full text-neutral-9 placeholder:text-neutral-6 outline-hidden ring-0 shadow-none
                  focus:outline-hidden focus:ring-0 focus:shadow-none"
                placeholder="Buscar com Inteligência Artificial"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <button className="rounded-lg border border-neutral-3 hover:border-neutral-4 focus:ring-1  gap-2 px-2 py-2 text-neutral-7 flex items-center justify-start text-sm whitespace-nowrap">
                  <div className="text-blueRibbon-5">
                    <CalendarRange width={22} strokeWidth={1.4} />
                  </div>
                  Últimos 7 dias
                </button>
                <Sort></Sort>
                <Filter></Filter>
              </div>
              <Notifications></Notifications>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 h-full gap-8 ">
              <div className="w-full h-full gap-8 flex flex-col">
                <div className="w-full h-60 bg-white rounded-2xl"></div>
                <div className="w-full h-60 bg-white rounded-2xl"></div>
              </div>
              <div className="w-full h-full gap-8 flex flex-col">
                <div className="w-full h-60 bg-white rounded-2xl"></div>
                <div className="w-full h-60 bg-white rounded-2xl"></div>
              </div>
            </div>
            <div className="w-full h-60 bg-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
