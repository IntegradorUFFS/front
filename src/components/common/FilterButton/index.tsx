import { ChevronLeft, ChevronRight, Circle, CircleCheck } from "lucide-react";
import React, { useRef, useState } from "react";
import Button from "../Button";
import { twMerge } from "tailwind-merge";

interface IProps {
  title?: string;
  childrens?: string[];
}

const FilterButton: React.FC<IProps> = ({ title, childrens }) => {
  const [active, setActive] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const popupRef = useRef<HTMLMenuElement>(null);

  const toggleItemSelection = (item: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  return (
    <>
      <button
        type="button"
        className="py-2 flex items-center w-full group"
        onClick={() => setActive(!active)}
      >
        <span className="text-m w-full text-left">{title}</span>
        <ChevronRight
          size={18}
          className={`${
            !active ? "-" : ""
          }rotate-180 transition-transform ease-in-out duration-200`}
        />
      </button>
      {active && (
        <menu
          className="absolute z-50 top-10 left-[302px] w-[260px] rounded-md bg-popover p-3 shadow-md"
          ref={popupRef}
        >
          <div className="flex flex-row  items-center">
            <button onClick={() => setActive(!active)}>
              <ChevronLeft size={18} />
            </button>
            <span className="text-m w-full text-center">{title}</span>
          </div>
          <div className="h-0.5 bg-zinc-200 my-2" />
          <div className="max-h-40 overflow-y-auto flex flex-col gap-2">
            {childrens && childrens.length > 0 ? (
              childrens.map((child, index) => (
                <button
                  key={index}
                  className={twMerge(
                    "px-2 text-start flex flex-row gap-2 align-center hover:bg-zinc-200 hover:opacity-60 rounded-md items-center"
                  )}
                  onClick={() => toggleItemSelection(child)}
                >
                  {selectedItems.includes(child) ? (
                    <CircleCheck size={16} className="flex " />
                  ) : (
                    <Circle size={16} className="flex" />
                  )}
                  <span className="max-line-1 w-full">{child}</span>
                </button>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                Nenhum(a) {title?.toLocaleLowerCase()} disponível no momento.
              </span>
            )}
          </div>
          {childrens!.length > 0 && (
            <div className="pt-2 flex justify-center">
              <Button
                text="Limpar"
                className="w-fit py-2 px-4 text-sm"
                type="button"
                variant="outline"
                onClick={() => setSelectedItems([])}
              />
            </div>
          )}
        </menu>
      )}
    </>
  );
};

export default FilterButton;
