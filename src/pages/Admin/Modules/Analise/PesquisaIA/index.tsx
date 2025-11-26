import React, { useEffect, useState } from "react";
import { Plus, Mic, Square, ArrowUp } from "lucide-react";
import { useAppDispatch } from "@/hooks";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "layout/disableBreadcrumb" });
  }, [dispatch]);
  const [recording, setRecording] = useState(false);
  const [writting, setWritting] = useState(false);

  const renderButtonIcon = () => {
    if (writting) return <ArrowUp strokeWidth={1} width={24} />;
    if (!recording) return <Mic strokeWidth={1} width={24} />;
    return <Square strokeWidth={1} width={18} />;
  };

  return (
    <>
      <div className="grid flex-1 grid-cols-[auto_minmax(200px,340px)]">
        <section className="px-6 py-8 flex flex-col">
          <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 to-purple-950 mb-8 gap-2 flex items-center justify-start">
            <img src="/assets/ix_ai.svg" alt="AI icon" width={24} height={24} />
            Pesquisa com AI
          </h1>
          <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col overflow-y-auto"></div>
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-[540px] rounded-2xl border border-neutral-4 shadow-xs p-4">
                <input
                  type="text"
                  className="bg-transparent min-h-6 w-full mb-2 text-neutral-9 placeholder:text-neutral-6 outline-hidden ring-0 shadow-none
                  focus:outline-hidden focus:ring-0 focus:shadow-none"
                  placeholder="Buscar com Inteligência Artificial"
                  onChange={(e) => setWritting(!!e.target.value)}
                />
                <div className="flex items-center justify-between text-neutral-9">
                  <button
                    className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-neutral-2 hover:outline-solid hover:outline-2 hover:outline-neutral-2 hover:shadow-md
                    transition-colors"
                  >
                    <Plus strokeWidth={1} width={24} />
                  </button>
                  <button
                    onClick={() => setRecording((prev) => !prev)}
                    className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-neutral-2 hover:outline-solid hover:outline-2 hover:outline-neutral-2 hover:shadow-md
                    transition-colors"
                  >
                    {renderButtonIcon()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="w-full h-full bg-gradient-to-b to-[#F1F4F8] from-[#EEF2FB]"></aside>
      </div>
    </>
  );
};

export default Page;
