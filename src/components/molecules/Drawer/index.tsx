import React, { ReactNode } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface TypeDrawer {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Drawer: React.FC<TypeDrawer> = ({ children, isOpen, setIsOpen }) => {
  return (
    <main
      className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ${
        isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 -translate-x-full"
      }`}
    >
      <section
        className={`w-8/12 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 h-full p-4">
          <IoCloseCircleOutline
            className="text-green-700 text-2xl cursor-pointer place-self-end"
            onClick={() => setIsOpen(false)}
          />
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => setIsOpen(false)}
      ></section>
    </main>
  );
};

export default Drawer;
