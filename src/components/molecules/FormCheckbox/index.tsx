import React from "react";
import Label from "../../atoms/Label";
import Inputs from "../../atoms/Inputs";

interface FormCheckboxProps {
  label: string;
  placeholder?: string;
  unique: string;
  className: string;
  isDisabled?: boolean;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formikTouched?: boolean;
  formikError?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  placeholder,
  unique,
  className,
  isDisabled = false,
  value,
  onChange,
  formikTouched,
  formikError,
}) => {
  return (
    <div>
      <Label
        htmlFor={unique}
        text={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <Inputs
        type="checkbox"
        id={unique}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
      {formikTouched && formikError && (
        <div className="text-danger mt-1">{formikError}</div>
      )}
    </div>
  );
};

export default FormCheckbox;
