import React, { forwardRef } from "react";
import RadioBase from "./Base";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  items: {
    label: string;
    value: string;
  }[];
  name: string;
  label?: string;
}

const Radio: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { items, name, label },
  ref
) => {
  return (
    <div className="flex flex-col gap-1">
      <RadioBase items={items} name={name} ref={ref} label={label} />
    </div>
  );
};

export default forwardRef(Radio);
