import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import * as Yup from "yup";
import { useFormik } from "formik";

import Dropdown from "../../molecules/Dropdown";
import Drawer from "../../molecules/Drawer";
import FormSearch from "../../molecules/FormSearch";
import Button from "../../atoms/Button";
import useHeaderLogic from "./useHeaderLogic";
import useResponsiveHeader from "./useResponsiveHeader";

const Header: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    dataCart,
    stateCategories,
    email,
    navigate,
    processLogout,
    isEmpty,
  } = useHeaderLogic();

  const { isTabletOrMobile, isDesktopOrLaptop } = useResponsiveHeader();
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  // const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const formik = useFormik({
    initialValues: {
      keyword: "",
    },
    validationSchema: Yup.object({
      keyword: Yup.string().max(255, "Maximum 255 characters"),
    }),
    onSubmit: (values) => {
      navigate(`/pencarian/${values.keyword}`);
    },
  });

  return (
    <header className="mb-3">
      <nav className="bg-green-700">
        <section className="container mx-auto flex justify-between items-center py-5 px-8">
          <section className="bg-gray-200 p-3 rounded-lg">
            <img src="/image/logo/logo.png" alt="logo" className="h-4 w-4" />
          </section>
          <FormSearch classNames="hidden lg:flex" formik={formik} />
          <section
            className="ml-3 flex justify-center items-center gap-1 bg-white rounded-lg py-2 px-3 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="text-green-700 text-2xl" />
            <span className="text-md">{dataCart.length}</span>
          </section>
        </section>
      </nav>

      {/* VERSION MOBILE */}
      {isTabletOrMobile && (
        <nav className="container mx-auto flex justify-between items-center py-5 px-8 bg-white">
          <FormSearch
            classNames="lg:hidden flex ring-1 ring-green-700"
            formik={formik}
          />
          <Button
            onClick={() => setIsOpen(true)}
            className="text-green-700 rounded"
            statusButton="link"
            type="button"
          >
            <GiHamburgerMenu className="text-2xl" />
          </Button>

          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <ul className="space-y-2 font-medium">
              <li>
                <Button
                  onClick={() => navigate("/")}
                  className={`w-full text-left ${isActive("/") ? "!bg-green-700 text-white" : ""}`}
                  statusButton="link"
                  type="button"
                >
                  <span className="ml-3">Beranda</span>
                </Button>
              </li>
              <li>
                <Dropdown
                  title="Kategori"
                  items={stateCategories}
                  onCloseDrawer={() => setIsOpen(false)}
                />
              </li>
              {isEmpty(email) ? (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/masuk")}
                      className={`w-full text-left ${isActive("/masuk") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Masuk</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/daftar")}
                      className={`w-full text-left ${isActive("/daftar") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Daftar</span>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/pesanan")}
                      className={`w-full text-left ${isActive("/pesanan") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Pesanan</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/pengaturan")}
                      className={`w-full text-left ${isActive("/pengaturan") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Pengaturan</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => processLogout()}
                      className={`w-full text-left ${isActive("/logout") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Logout</span>
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </Drawer>
        </nav>
      )}

      {/* VERSION Desktop */}
      {isDesktopOrLaptop && (
        <nav className="bg-white">
          <section className="container mx-auto flex md:justify-between md:items-center py-5 px-8">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Button
                  onClick={() => navigate("/")}
                  className={`rounded-lg ${isActive("/") ? " !text-white !bg-green-700 " : ""}`}
                  statusButton="link"
                  type="button"
                >
                  Beranda
                </Button>
              </li>
              <li>
                <Dropdown
                  title="Kategori"
                  items={stateCategories}
                  isActive={isActive("/kategori")}
                />
              </li>
              {/* <li>
              <Button
                onClick={() => navigate("/")}
                className={`rounded-lg ${isActive("/tentang") ? " !text-white !bg-green-700 " : ""}`}
                statusButton="link"
                type="button"
              >
                Tentang
              </Button>
            </li> */}
            </ul>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
              {isEmpty(email) ? (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/masuk")}
                      className={`rounded-lg ${isActive("/masuk") ? " !text-white !bg-green-700 " : ""}`}
                      type="button"
                      statusButton="link"
                    >
                      Masuk
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/daftar")}
                      className={`rounded-lg ${isActive("/daftar") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Daftar
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/pesanan")}
                      className={`rounded-lg ${isActive("/pesanan") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Pesanan
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/pengaturan")}
                      className={`rounded-lg ${isActive("/pengaturan") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Pengaturan
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => processLogout()}
                      className={`rounded-lg ${isActive("/logout") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </section>
        </nav>
      )}
    </header>
  );
};

export default Header;
