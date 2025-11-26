import React from "react";
import { ICard } from "../../@types";
import { Plus, FolderOpen } from "lucide-react";
import CardSortable from "../Card";

import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface IProps {
  highlightColor?: string;
  dataValue: number;
  title: string;
  cards: ICard[];
  canInsert: boolean;
}

const Column: React.FC<IProps> = ({
  highlightColor,
  dataValue,
  title,
  canInsert,
  cards = [],
}) => {
  // 🔥 Torna a coluna inteira droppable
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${dataValue}`,
    data: { status: dataValue },
  });

  return (
    <div
      ref={setNodeRef}
      data-value={dataValue}
      className={`flex flex-col py-6 px-4 w-80 bg-neutral-2 rounded-2xl items-center justify-center gap-4 h-fit transition-colors
        ${isOver ? "bg-neutral-3" : ""}
      `}
    >
      <header className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center justify-center text-neutral-8">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: highlightColor }}
            ></span>

            {title}

            <span className="px-2 py-1 bg-neutral-3 text-neutral-6 text-xs rounded-3xl leading-none">
              {cards.length}
            </span>
          </div>

          {canInsert && (
            <button
              className="w-[22px] h-[22px] flex items-center justify-center rounded-md bg-(--c) hover:bg-(--c-hover) transition-colors"
              style={{
                ["--c" as any]: `${highlightColor}1A`,
                ["--c-hover" as any]: `${highlightColor}33`,
              }}
            >
              <Plus size={18} color={highlightColor} />
            </button>
          )}
        </div>

        <hr
          className="mt-4 h-0.5 border-none outline-hidden"
          style={{ background: highlightColor }}
        />
      </header>

      {/* SortableContext precisa ficar dentro da coluna droppable */}
      <SortableContext items={cards.map((c) => c.id)}>
        {cards.length > 0 ? (
          cards.map((card) => (
            <CardSortable key={card.id} {...card} status={dataValue} />
          ))
        ) : (
          <div className="w-full py-6 flex text-neutral-5 text-sm gap-2 items-center justify-center border border-dashed border-neutral-4 rounded-xl">
            <FolderOpen size={18} /> Nenhum item aqui por enquanto
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default Column;
