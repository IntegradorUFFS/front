import React from "react";
import toTitleCase from "@/helpers/toTitleCase";

interface TitleProps {
  title: string;
}

const TitleLine: React.FC<TitleProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-medium font-roboto tracking-wide">
      {toTitleCase(title)}
    </h2>
  );
};
export default TitleLine;
