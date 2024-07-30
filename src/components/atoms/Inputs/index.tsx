import React, { memo } from "react";

interface InputProps {
  type: "text" | "email" | "password";
  placeholder?: string;
  id: string;
  className: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  id,
  className,
  value,
  onChange,
  isDisabled = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
};

export default memo(Input);
