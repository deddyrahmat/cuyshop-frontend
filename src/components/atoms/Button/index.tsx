import React, { memo, ReactEventHandler, ReactNode } from "react";
import Loading from "../Loading";

interface ButtonProps {
  children?: ReactNode;
  className: string;
  isLoading?: boolean;
  statusButton: "primary" | "danger" | "gray" | "disabled";
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
  onClick?: ReactEventHandler;
}

const buttonStyles = {
  primary:
    "bg-green-800 hover:bg-green-600 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base",
  danger:
    "bg-red-800 hover:bg-red-600 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base",
  gray: "bg-gray-600 hover:bg-green-600 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-white font-semibold xxl:font-bold text-sm xxl:text-base",
  disabled:
    "bg-gray-400 py-[8px] px-[16px] xxl:py-[12px] xxl:px-[24px] rounded text-gray-200 font-semibold xxl:font-bold text-sm xxl:text-base",
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading = false,
  statusButton = "primary",
  type = "button",
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${className} ${buttonStyles[statusButton]}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Loading type="sm" /> : children}
    </button>
  );
};

export default memo(Button);
