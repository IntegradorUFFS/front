import { SearchIcon } from "lucide-react";
import Input from "..";
import { forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Search: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  IProps
> = ({ placeholder, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="py-2 flex flex-row border border-zinc-300 rounded-md">
        <SearchIcon
          size={18}
          className="m-2 text-zinc-400 justify-self-center"
        />
        <Input
          type="text"
          className="flex items-center w-full text-m focus:outline-none bg-transparent"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
};

export default forwardRef(Search);
