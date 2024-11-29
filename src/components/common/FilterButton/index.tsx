import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import Button from "../Button";
import Searchable from "../Radio/Searchable";
import Radio from "../Radio";
import Search from "@/components/common/Input/Search";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  filter_text: z.string().optional().nullable(),
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

  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      filter_key: searchParams.get(`filter[${filter.name}]`) || "",
      filter_text: searchParams.get(`filter[${filter.name}]`) || "",
    },
  });

  useEffect(() => {
    register("filter_text");
  }, [register]);

  const renderField = (filter: any) => {
    if (filter.options) {
      return (
        <Radio
          items={filter.options}
          {...register("filter_key")}
          onChange={(e) => {
            setValue("filter_key", e.target.value);
            if (e.target?.ariaLabel)
              setValue("filter_text", e.target?.ariaLabel);
          }}
        />
      );
    }

    if (filter.searchBar) {
      return (
        <Search
          placeholder={filter.placeholder}
          {...register("filter_key")}
          onChange={(e) => {
            setValue("filter_key", e.target.value);
          }}
        />
      );
    }

    return (
      <Searchable
        endpoint={filter.endpoint}
        {...register("filter_key")}
        placeholder={filter.placeholder}
        onChange={(e) => {
          setValue("filter_key", e.target.value);
          if (e.target?.ariaLabel) setValue("filter_text", e.target?.ariaLabel);
        }}
      />
    );
  };

  const handleFilter = useCallback(
    (data: any) => {
      if (!data || data.filter_key == "" || data.filter_key == undefined)
        return;

      if (data?.filter_text) {
        searchParams.set(
          `filter[${filter.name}]`,

          JSON.stringify({
            value: data.filter_key,
            text: data.filter_text,
          })
        );
      } else searchParams.set(`filter[${filter.name}]`, data.filter_key);
      setSearchParams(searchParams);
      toggle(filter.title);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey });
      }, 150);
    },
    [
      searchParams,
      filter.name,
      filter.title,
      setSearchParams,
      toggle,
      queryClient,
      queryKey,
    ]
  );

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
                setTimeout(() => {
                  queryClient.invalidateQueries({ queryKey });
                }, 150);
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
