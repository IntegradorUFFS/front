import React, { forwardRef } from "react";
import Text from "./Text";
import Password from "./Password";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  toggleOpacity?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { label, placeholder, type = "text", disabled, ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-1 text-sm font-sans ">
      {label}
      {type === "password" ? (
        <Password
          placeholder={placeholder}
          disabled={disabled}
          {...props}
          ref={ref}
        />
      ) : (
        <Text
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...props}
          ref={ref}
        />
      )}
    </div>
  );
};

export default forwardRef(Input);
