import React from "react";
import Label from "../../atoms/Label";
import Inputs from "../../atoms/Inputs";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  unique: string;
  className: string;
  type?: "text" | "email" | "password";
  isDisabled?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formikTouched?: boolean;
  formikError?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  unique,
  className,
  type = "text",
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
        type={type}
        id={unique}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
      {formikTouched && formikError && (
        <div className="text-red-700 mt-1">{formikError}</div>
      )}
    </div>
  );
};

export default FormField;
