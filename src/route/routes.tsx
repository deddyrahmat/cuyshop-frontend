// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Loading from "../components/atoms/Loading";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Account from "../pages/account";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import Search from "../pages/Search";

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
    path: "/search/:keyword",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: "/kategori/:kategoriId",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Categories />
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
        path: "/orders",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to="/login" replace />,
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
        path: "login",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading type="xl" />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
