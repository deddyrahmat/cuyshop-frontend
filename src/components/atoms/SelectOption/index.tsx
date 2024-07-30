import React from "react";

interface SelectOptionProps {
  value: string;
  label: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};

export default SelectOption;
