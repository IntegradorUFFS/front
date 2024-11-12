import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import Button from "../Button";

interface IProps {
  title: string;
  toggle: (tab: string) => void;
  active: boolean;
  content: React.ReactNode;
  search?: boolean;
}

const FilterButton: React.FC<IProps> = ({
  title,
  toggle,
  active,
  content,
  search,
}) => {
  const popupRef = useRef<HTMLMenuElement>(null);

  return (
    <>
      <button
        type="button"
        className="py-2 flex items-center w-full group"
        onClick={() => toggle(title)}
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
          className="absolute z-50 top-0 left-[302px] w-[260px] rounded-md bg-popover p-3 shadow-md"
          ref={popupRef}
        >
          <div className="flex flex-row  items-center">
            <button onClick={() => toggle(title)}>
              <ChevronLeft size={18} />
            </button>
            <span className="text-m w-full text-center">{title}</span>
          </div>
          <div className="h-0.5 bg-zinc-200 my-2" />
          <div
            className={
              search ? "" : "max-h-40 overflow-y-auto flex flex-col gap-2"
            }
          >
            {content}
          </div>
          <div className="pt-2 flex justify-center">
            <Button
              text="Limpar"
              className="w-fit py-2 px-4 text-sm"
              type="button"
              variant="outline"
              onClick={() => {}}
            />
          </div>
        </menu>
      )}
    </>
  );
};

export default FilterButton;
