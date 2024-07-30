import React from "react";
import Select, { createFilter } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends SelectOption> {
  options: T[];
  value?: T | null;
  onChange: (selectedOption: T | null) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
}

const CustomSelect: React.FC<SelectProps<any>> = ({
  options,
  value,
  onChange,
  isMulti = false,
  isSearchable = true,
}) => {
  const filterOption = createFilter({
    ignoreAccents: false,
    stringify: (option) => option.label,
  });

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      filterOption={filterOption}
    />
  );
};

export default CustomSelect;
