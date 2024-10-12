import React from "react";
import toTitleCase from "@/helpers/toTitleCase";

interface TitleProps {
  title: string;
  buttons?: React.ReactNode[];
}

const TitleLine: React.FC<TitleProps> = ({ title, buttons }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <h2 className="text-3xl font-medium font-roboto tracking-wide">
        {toTitleCase(title)}
      </h2>
      <div className="flex flex-row justify-end items-center flex-1 gap-2">
        {buttons?.map((button, i) => (
          <div key={`button-${i}`}>{button}</div>
        ))}
      </div>
    </div>
  );
};
export default TitleLine;
