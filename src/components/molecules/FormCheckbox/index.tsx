import React from "react";
import Label from "../../atoms/Label";
import Inputs from "../../atoms/Inputs";

interface FormCheckboxProps {
  label: string;
  unique: string;
  className: string;
  isDisabled?: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formikTouched?: boolean;
  formikError?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  unique,
  className,
  isDisabled = false,
  checked,
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
        checked={checked} // Gunakan `checked` untuk checkbox
        onChange={onChange}
        isDisabled={isDisabled}
        value={""}
      />
      {formikTouched && formikError && (
        <div className="text-red-500 mt-1">{formikError}</div> // Perbaiki kelas CSS untuk error
      )}
    </div>
  );
};

export default FormCheckbox;
