// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Loading from "../components/atoms/Loading";

const Notfound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));
const Orders = lazy(() => import("../pages/Orders"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Search = lazy(() => import("../pages/Search"));
const Settings = lazy(() => import("../pages/Settings"));

// import Categories from "../pages/Categories";
// import Account from "../pages/account";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/pencarian/:keyword",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: "/produk/:productId",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: "/kategori/:slug",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Home />
      </Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <PrivateRoute />
      </Suspense>
    ),
    children: [
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/pesanan",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "/pengaturan",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to="/masuk" replace />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <GuestRoute />
      </Suspense>
    ),
    children: [
      {
        path: "masuk",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "daftar",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to="/masuk" replace />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Notfound />
      </Suspense>
    ),
  },
]);
