import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Column from "./components/Column";
import CardSortable from "./components/Card";
import { toMapColumns } from "./static/data";
import { ICard } from "./@types";
import { data } from "./test";
import { useAppDispatch } from "@/hooks";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "layout/setBreadcrumb", payload: "Pipeline" });
  }, [dispatch]);

  const [activeCard, setActiveCard] = useState<ICard | undefined>(undefined);
  const [cards, setCards] = useState(
    data.reduce((acc, card) => {
      if (!acc[card.status]) acc[card.status] = [];
      acc[card.status].push(card);
      return acc;
    }, {} as Record<number, ICard[]>)
  );

  function handleDragStart(event: any) {
    const cardId = event.active.id;
    const column = event.active.data.current?.status;
    const card = cards[column].find((c) => c.id === cardId);
    setActiveCard(card);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    setActiveCard(undefined);

    if (!over) return;

    const from = active.data.current?.status;
    const to = over.data.current?.status;

    if (from === to) return;

    const movedCard = cards[from].find((c) => c.id === active.id);

    if (!movedCard) return;

    setCards((prev) => {
      const next = { ...prev };
      next[from] = next[from].filter((c) => c.id !== active.id);
      next[to] = [...next[to], { ...movedCard, status: to }];
      return next;
    });
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="px-6 pb-8 min-w-fit">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6">
            {toMapColumns.map((column) => (
              <Column
                key={column.data_value}
                dataValue={column.data_value}
                title={column.title}
                highlightColor={column.highlight_color}
                canInsert={false}
                cards={cards[column.data_value] || []}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard ? <CardSortable {...activeCard} dragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Page;
