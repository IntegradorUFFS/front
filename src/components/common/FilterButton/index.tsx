import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useRef } from "react";
import Button from "../Button";
import Searchable from "../Radio/Searchable";
import Radio from "../Radio";
import ItemList from "@/components/common/Input/Search";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";

interface IProps {
  toggle: (tab: string) => void;
  active: boolean;
  filter: {
    title: string;
    children?: string[];
    endpoint?: string;
    name: string;
    placeholder?: string;
    searchBar?: boolean;
    options?: { label: string; value: string | number | undefined }[];
  };
  queryKey: string[];
}

const schema = z.object({
  filter_key: z.string().optional(),
});

const FilterButton: React.FC<IProps> = ({
  toggle,
  active,
  filter,
  queryKey,
}) => {
  const popupRef = useRef<HTMLMenuElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      filter_key: searchParams.get(`filter[${filter.name}]`) || "",
    },
  });

  const renderField = (filter: any) => {
    //console.log(filter);

    if (filter.options) {
      return <Radio items={filter.options} {...register("filter_key")} />;
    }

    if (filter.searchBar) {
      return (
        <ItemList
          placeholder={filter.placeholder}
          {...register("filter_key")}
        />
      );
    }

    return (
      <Searchable
        endpoint={filter.endpoint}
        {...register("filter_key")}
        placeholder={filter.placeholder}
      />
    );
  };

  const handleFilter = useCallback(
    (data: any) => {
      console.log(data);
      if (!data.filter_key) return;
      searchParams.set(`filter[${filter.name}]`, data.filter_key);
      setSearchParams(searchParams);
      console.log(searchParams.values());
      queryClient.invalidateQueries({ queryKey });
    },
    [setSearchParams, searchParams, queryKey, queryClient]
  );

  console.log(errors);

  return (
    <>
      <button
        type="button"
        className="py-2 flex items-center w-full group"
        onClick={() => toggle(filter.title)}
      >
        <span className="text-m w-full text-left">{filter.title}</span>
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
            <button onClick={() => toggle(filter.title)}>
              <ChevronLeft size={18} />
            </button>
            <span className="text-m w-full text-center">{filter.title}</span>
          </div>
          <div className="h-0.5 bg-zinc-200 my-2" />
          <div
            className={
              filter.searchBar
                ? ""
                : "max-h-40 overflow-y-auto flex flex-col gap-2"
            }
          >
            {renderField(filter)}
          </div>
          <div className="pt-2 flex justify-center flex-row gap-6">
            <Button
              onClick={() => {
                setValue("filter_key", "");
                searchParams.delete(`filter[${filter.name}]`);
                setSearchParams(searchParams);
                queryClient.invalidateQueries({ queryKey });
              }}
              text="Limpar"
              className="w-fit py-2 px-4 text-sm"
              type="button"
              variant="outline"
            />
            <Button
              onClick={handleSubmit(handleFilter)}
              text="Pesquisar"
              type="submit"
              className="w-fit py-2 px-4 text-sm ring-2 ring-orange-600 disabled:ring-zinc-400"
              variant="filled"
            />
          </div>
        </menu>
      )}
    </>
  );
};

export default FilterButton;
