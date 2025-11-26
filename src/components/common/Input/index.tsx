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
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  realNum?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement | null, IProps> = (
  {
    error,
    label,
    placeholder,
    type = "text",
    disabled,
    realNum,
    onChange,
    ...props
  },
  ref
) => {
  return (
    <div className="flex flex-col gap-2 text-sm  w-full">
      <div className="grid grid-cols-3 justify-between">
        {label && <span className="font-semibold col-span-2">{label}</span>}
      </div>
      {type === "password" ? (
        <Password
          placeholder={placeholder}
          disabled={disabled}
          {...props}
          ref={ref}
          invalid={!!error}
          onChange={onChange}
          autoComplete="off"
        />
      ) : (
        <Text
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...props}
          ref={ref}
          realNum={realNum}
          invalid={!!error}
          onChange={onChange}
          autoComplete="off"
        />
      )}
      {error && <span className="text-sm text-red-600 ml-2">{error}</span>}
    </div>
  );
};

export default forwardRef(Input);
