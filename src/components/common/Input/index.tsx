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
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  {
    error,
    label,
    placeholder,
    value = "",
    type = "text",
    disabled,
    onChange,
    ...props
  },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 text-sm font-sans w-full">
      {label && <span className="font-semibold">{label}</span>}
      {type === "password" ? (
        <Password
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          {...props}
          ref={ref}
          invalid={!!error}
          onChange={onChange}
        />
      ) : (
        <Text
          placeholder={placeholder}
          type={type}
          value={value}
          disabled={disabled}
          {...props}
          ref={ref}
          invalid={!!error}
          onChange={onChange}
        />
      )}
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
