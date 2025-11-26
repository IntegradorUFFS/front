import React, { useMemo } from "react";
import { ICard } from "../../@types";
import { Ellipsis } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { twMerge } from "tailwind-merge";

const CardSortable: React.FC<ICard & { status?: number }> = ({
  date,
  expiration,
  id,
  plate,
  status,
  dragging,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  const cardData = useMemo(() => {
    const daysDiff = Math.floor(
      (new Date(expiration).getTime() - new Date().getTime()) / 86400000
    );

    if (daysDiff > 30) {
      const total = Math.floor(daysDiff / 30);
      return {
        message: `Vencimento em ${total} ${total > 1 ? "meses" : "mês"}`,
        color: "#A26807",
      };
    }

    if (daysDiff > 0)
      return {
        message: `Vencimento em ${daysDiff} dias`,
        color: daysDiff > 10 ? "#A26807" : "#C32727",
      };

    if (daysDiff === 0) return { message: "Vence hoje", color: "#C32727" };

    return { message: `Venceu há ${daysDiff * -1} dias`, color: "#C32727" };
  }, [expiration]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={twMerge("w-full", dragging ? "rotate-3 scale-[1.03]" : "")}
    >
      <div
        className={twMerge(
          "flex flex-col  bg-surface-elevated shadow-xs rounded-3xl py-3 px-4 active:cursor-grabbing transition-transform",
          isDragging ? "hidden" : ""
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs py-1 px-3 rounded-xl"
            style={{
              background: `${cardData.color}1A`,
              color: cardData.color,
            }}
          >
            {cardData.message}
          </span>

          <button className="p-1">
            <Ellipsis size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <span className="font-medium">{id}</span>
          <span className="text-neutral-5 text-sm">{plate}</span>

          <span className="text-sm">
            Infração:{" "}
            <span className="text-neutral-5 text-sm">
              {new Date(date).toLocaleDateString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>

          <span className="text-sm">
            Vencimento:{" "}
            <span className="text-neutral-5 text-sm">
              {new Date(expiration).toLocaleDateString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
        </div>
      </div>

      <div
        className={twMerge(
          "flex flex-col h-[152px] bg-[#0447D30f] outline-1 outline-dashed outline-[#0447D399] rounded-3xl ",
          !isDragging ? "hidden" : ""
        )}
      ></div>
    </div>
  );
};

export default CardSortable;
