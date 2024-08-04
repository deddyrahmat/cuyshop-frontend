import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
  title: string;
  items: { label: string; href: string }[];
  multi?: boolean;
  isActive?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  items,
  multi = false,
  isActive = false,
}) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<number, boolean>>({});

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleSubmenu = (index: number) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="relative">
      <Button
        className={`flex items-center justify-between w-full pl-7 pr-9 text-gray-900 hover:bg-gray-100 rounded-lg ${isActive ? " !text-green-700 hover:!text-white" : ""}`}
        onClick={toggleDropdown}
        statusButton="link"
        type="button"
      >
        {title} <FaChevronDown className="ml-2" />
      </Button>
      <div
        className={`absolute z-10 mt-2 w-44 space-y-2 rounded-lg shadow-lg ${!isOpen && "hidden"}`}
      >
        {items.map((item, index) => (
          <div key={index}>
            <Button
              onClick={() => navigate(item.href)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg border border-green-700 !text-gray-800 bg-white hover:!text-white "
              statusButton="gray"
              type="button"
            >
              {item.label}
            </Button>
            {multi && (
              <Button
                onClick={() => toggleSubmenu(index)}
                className="flex items-center justify-between w-full px-4 py-2"
                statusButton="gray"
                type="button"
              >
                Submenu <FaChevronDown className="ml-2" />
              </Button>
            )}
            {multi && openSubmenus[index] && (
              <div className="ml-4">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Sub Item 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Sub Item 2
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
