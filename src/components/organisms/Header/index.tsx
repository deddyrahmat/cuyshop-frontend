import { useState } from "react";
import Drawer from "../../molecules/Drawer";
import FormSearch from "../../molecules/FormSearch";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="mb-3">
      <nav className=" bg-green-700 ">
        <section className="2xl:container 2xl:mx-auto flex justify-between items-center py-5 px-8 2xl:px-1">
          <section className="bg-gray-200 p-3 rounded-lg">
            <img src="/image/logo/logo.png" alt="logo" className="h-4 w-4" />
          </section>
          <FormSearch classNames="hidden md:flex" />
          <section
            className="ml-3 flex justify-center items-center gap-1 bg-white  rounded-lg py-2 px-3 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-green-700 text-2xl" />
            <span className="text-md">3</span>
          </section>
        </section>
      </nav>

      {/* VERSION MOBILE */}
      <nav className="flex md:hidden justify-between items-center py-5 px-8 bg-white">
        <button
          className="text-green-700 rounded "
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>

        <FormSearch classNames="md:hidden flex ring-1 ring-green-700" />

        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Kategori</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Semua Produk</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Tentang</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Login</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Register</span>
              </a>
            </li>
            <li>
              <a
                href="/orders"
                className="flex items-center p-2 text-gray-900 hover:text-white rounded-lg dark:text-white hover:bg-green-700 dark:hover:bg-gray-700 group"
              >
                <span className="ms-3">Orders</span>
              </a>
            </li>
          </ul>
        </Drawer>
      </nav>

      {/* VERSION TABLET UP */}
      <nav className=" bg-white">
        <section className="2xl:container 2xl:mx-auto hidden md:flex md:justify-between md:items-center py-5 px-8 2xl:px-1">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Kategori
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Semua Produk
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Tentang
              </a>
            </li>
          </ul>

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Register
              </a>
            </li>
            <li>
              <a
                href="/orders"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Orders
              </a>
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
}

export default Header;
