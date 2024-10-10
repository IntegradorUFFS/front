import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const TitleLine: React.FC<TitleProps> = ({ children }) => {
  return (
    <p className="text-4xl">
      <strong>{children}</strong>
    </p>
  );
};
export default TitleLine;
