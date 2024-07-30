import React from "react";
import CustomSelect from "../../atoms/CustomSelect";
import Label from "../../atoms/Label";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string | { value: string; label: string }; // Sesuaikan tipe value
  onChange?: (selectedOption: { value: string; label: string } | null) => void;
  error?: string;
  isSearchable?: boolean;
}

const FormCustomSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  isSearchable,
}) => {
  return (
    <div className="form-field">
      <Label
        htmlFor={name}
        text={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <CustomSelect
        id={name}
        name={name}
        options={options}
        value={
          value
            ? {
                value,
                label:
                  options.find((option) => option.value === value)?.label || "",
              }
            : null
        }
        onChange={onChange}
        isSearchable={isSearchable}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormCustomSelect;
