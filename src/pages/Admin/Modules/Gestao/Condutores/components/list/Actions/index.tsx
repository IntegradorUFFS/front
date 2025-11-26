import React from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const index: React.FC = () => (
  <div className="flex justify-center items-center w-full">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          style={{ cursor: "pointer" }}
          className="flex justify-center items-center w-6 h-6  hover:backdrop-brightness-95 rounded-full text-neutral-8 hover:text-black transition"
        >
          <EllipsisVertical strokeWidth={1} fill="#000" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => console.log(true)}>
          true
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default index;
