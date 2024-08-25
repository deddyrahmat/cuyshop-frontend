import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Dropdown from "../../molecules/Dropdown";
import Drawer from "../../molecules/Drawer";
import FormSearch from "../../molecules/FormSearch";
import { handleCategories } from "../../../services/categories";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import Button from "../../atoms/Button";
import { CartSliceType } from "../../../types/containerTypes";
import { handleLogout } from "../../../services/auth";
import { toast } from "react-toastify";
import { RESET_AUTH_STATE, USER_LOGOUT } from "../../../redux/authSlice";
import { RESET_ADDRESS_STATE } from "../../../redux/addressSlice";
import { RESET_CART_STATE } from "../../../redux/cartSlice";
import { useMediaQuery } from "react-responsive";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface DropdownMenu {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1024px)" });
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: any) => state.auth);
  const { data: dataCart } = useAppSelector(
    (state: { cart: CartSliceType }) => state.cart
  );
  // const { data: dataCart } = useAppSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dataCategories, setDataCategories] = useState<DropdownMenu[]>([]);

  const isActive = (path: string) => {
    // Jika path sama dengan '/'
    if (path === "/") {
      // Cek jika pathname saat ini adalah '/'
      return location.pathname === "/";
    }

    // Cek jika pathname saat ini dimulai dengan path yang diberikan
    return location.pathname.startsWith(path);
  };

  const listMenuCategories = async () => {
    const res = await handleCategories();
    if (res) {
      let dataMenu: DropdownMenu[] = [];
      res?.data?.data.map(
        (item: Category) =>
          (dataMenu = [
            ...dataMenu,
            { label: item.name, href: `/kategori/${item.slug}` },
          ])
      );
      setDataCategories(dataMenu);
    }
  };

  useEffect(() => {
    listMenuCategories();
  }, []);

  const processLogout = async () => {
    const res = await handleLogout();
    console.log("res", res);
    if (res?.status) {
      dispatch(USER_LOGOUT());
      dispatch(RESET_ADDRESS_STATE());
      dispatch(RESET_CART_STATE());

      toast.success("Logout Berhasil");
      navigate("/", { replace: true });
    }
  };

  const formik = useFormik({
    initialValues: {
      keyword: "",
    },
    validationSchema: Yup.object({
      keyword: Yup.string().max(255, "Maximum 255 characters"),
    }),
    onSubmit: (values: any) => {
      navigate(`/search/${values.keyword}`);
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
          <Button
            onClick={() => setIsOpen(true)}
            className="text-green-700 rounded"
            statusButton="link"
            type="button"
          >
            <GiHamburgerMenu className="text-2xl" />
          </Button>

          <FormSearch
            classNames="lg:hidden flex ring-1 ring-green-700"
            formik={formik}
          />

          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <ul className="space-y-2 font-medium">
              <li>
                <Button
                  onClick={() => navigate("/")}
                  className={`w-full text-left ${isActive("/") ? "!bg-green-700 text-white" : ""}`}
                  statusButton="link"
                  type="button"
                >
                  <span className="ml-3">Home</span>
                </Button>
              </li>
              <li>
                <Dropdown title="Kategori" items={dataCategories} />
              </li>
              {isEmpty(email) ? (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/login")}
                      className={`w-full text-left ${isActive("/login") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Login</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/register")}
                      className={`w-full text-left ${isActive("/register") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Register</span>
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/orders")}
                      className={`w-full text-left ${isActive("/orders") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Orders</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/settings")}
                      className={`w-full text-left ${isActive("/settings") ? "!bg-green-700 text-white" : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      <span className="ml-3">Settings</span>
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
                  Home
                </Button>
              </li>
              <li>
                <Dropdown
                  title="Kategori"
                  items={dataCategories}
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {isEmpty(email) ? (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/login")}
                      className={`rounded-lg ${isActive("/login") ? " !text-white !bg-green-700 " : ""}`}
                      type="button"
                      statusButton="link"
                    >
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/register")}
                      className={`rounded-lg ${isActive("/register") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Register
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      onClick={() => navigate("/orders")}
                      className={`rounded-lg ${isActive("/orders") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Orders
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => navigate("/settings")}
                      className={`rounded-lg ${isActive("/settings") ? " !text-white !bg-green-700 " : ""}`}
                      statusButton="link"
                      type="button"
                    >
                      Settings
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
