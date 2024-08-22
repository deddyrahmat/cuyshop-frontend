import React from "react";

interface InputProps {
  type: "text" | "search" | "email" | "password" | "checkbox" | "radio";
  placeholder?: string;
  id: string;
  className: string;
  value: string | number | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  name?: string; // Optional for radio buttons
  checked?: boolean; // Tambahkan ini untuk mendukung prop checked
  onFocus?: () => void; // Tambahkan properti onFocus
  onBlur?: () => void; // Tambahkan properti onBlur
}

const Inputs: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  id,
  className,
  value,
  onChange,
  isDisabled = false,
  onFocus, // Tambahkan onFocus ke properti umum
  onBlur, // Tambahkan onBlur ke properti umum
  name,
  checked, // Tambahkan ini untuk mendukung prop checked
}) => {
  const commonProps = {
    id,
    className,
    onChange,
    disabled: isDisabled,
  };

  if (type === "checkbox" || type === "radio") {
    return (
      <input
        type={type}
        {...commonProps}
        checked={checked} // Gunakan prop checked di sini
        name={name} // Include name for radio buttons
      />
    );
  }

  return (
    <input
      type={type}
      {...commonProps}
      placeholder={placeholder}
      value={typeof value === "boolean" ? String(value) : value}
    />
  );
};

export default Inputs;
