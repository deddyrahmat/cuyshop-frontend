import React, { memo } from "react";

interface InputProps {
  type: "text" | "email" | "password" | "checkbox";
  placeholder?: string;
  id: string;
  className: string;
  value: string | number | boolean;
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
  return type === "checkbox" ? (
    <input
      type={type}
      id={id}
      className={className}
      checked={!!value} // Ensure this is a boolean
      onChange={onChange}
      disabled={isDisabled}
    />
  ) : (
    <input
      type={type}
      id={id}
      className={className}
      placeholder={placeholder}
      value={typeof value === "boolean" ? String(value) : value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
};

export default memo(Input);
