import React, { ReactNode } from "react";
import Inputs from "../../atoms/Inputs";

interface FormFieldProps {
  placeholder?: string;
  unique: string;
  type?: "radio";
  isDisabled?: boolean;
  value: string;
  children: ReactNode;
  checked: boolean; // Used to determine if the radio is selected
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formikTouched?: boolean;
  formikError?: string;
}

const FormRadio: React.FC<FormFieldProps> = ({
  placeholder,
  children,
  unique,
  type = "radio",
  isDisabled = false,
  value,
  checked,
  onChange,
  formikTouched,
  formikError,
}) => {
  return (
    <div>
      <label htmlFor={unique}>{children}</label>
      <Inputs
        type={type}
        id={unique}
        className="hidden"
        placeholder={placeholder}
        value={value}
        checked={checked}
        onChange={onChange}
        isDisabled={isDisabled}
      />
      {formikTouched && formikError && (
        <div className="text-red-700 mt-1">{formikError}</div>
      )}
    </div>
  );
};

export default FormRadio;
