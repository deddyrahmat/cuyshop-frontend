// mengelola input mulai dari validation hingga animasi
// untuk label dan lainnya di component atom lain
import React from "react";

interface TypeInput {
  placeholder?: string;
  unique: string;
  className: string;
  type?: "text" | "email" | "password";
  isDisabled?: boolean;
  value: string | number; // Menyesuaikan tipe value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Menyesuaikan tipe onChange
  formikTouched: boolean; // Mengubah tipe formikTouched menjadi boolean
  formikError: string | undefined; // Mengubah tipe formikError menjadi string atau undefined
}

const Input: React.FC<TypeInput> = ({
  className,
  type = "text",
  isDisabled = false,
  unique,
  placeholder,
  value,
  onChange,
  formikTouched,
  formikError,
}) => {
  return (
    <>
      <input
        type={type}
        name={unique}
        id={unique}
        disabled={isDisabled}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {formikTouched && formikError ? (
        <div className="text-danger mt-1">{formikError}</div>
      ) : null}
    </>
  );
};

export default Input;
