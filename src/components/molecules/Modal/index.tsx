import React, { useState, ReactNode, FC, useEffect } from "react";
import Button from "../../atoms/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 75); // Delay close untuk memberikan waktu pada animasi dan ini sesuai dengan duration-75 dibawah
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 transition-opacity duration-75 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClickOutside}
    >
      <div
        className={`relative w-full max-w-2xl p-4 transition-transform transform-gpu duration-75 ease-in-out ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <Button
              className=""
              statusButton="link"
              type="button"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </Button>
          </div>
          <div className="p-4 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
