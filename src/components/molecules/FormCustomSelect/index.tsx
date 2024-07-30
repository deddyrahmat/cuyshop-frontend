import React from "react";
import CustomSelect from "../../atoms/CustomSelect";
import Label from "../../atoms/Label";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string | { value: string; label: string }; // Sesuaikan tipe value
  // onChange?: (selectedOption: { value: string; label: string } | null) => void;
  onChange?: (selectedOption: { value: string; label: string } | null) => void;
  error?: string;
  isSearchable?: boolean;
}

const FormCustomSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange = () => {}, // Default function
  error,
  isSearchable,
}) => {
  const selectedOption = options.filter((option) => option.value === value)[0];
  return (
    <div className="form-field">
      <Label
        htmlFor={name}
        text={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <CustomSelect
        options={options}
        value={
          value
            ? {
                value,
                label: selectedOption ? selectedOption.label : "",
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
