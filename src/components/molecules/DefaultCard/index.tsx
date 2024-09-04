import React, { ReactNode } from "react";
import Button from "../../atoms/Button";

interface CardProps {
  children: ReactNode;
  onClick?: () => void; // Optional onClick
}

const DefaultCard: React.FC<CardProps> = ({ children, onClick }) => {
  // If onClick is not provided, default to an empty function
  const handleClick = onClick ? onClick : () => {};

  return (
    <Button
      statusButton="link"
      type="button"
      onClick={handleClick}
      className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full"
      // className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {children}
    </Button>
  );
};

export default DefaultCard;
