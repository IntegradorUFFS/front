import React, { forwardRef } from "react";
import Text from "./Text";
import Password from "./Password";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  toggleOpacity?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  { error, label, placeholder, type = "text", disabled, ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 text-sm font-sans font-semibold">
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
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
