import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loading from "../components/atoms/Loading";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    path: "/product/:productId",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <Register />
      </Suspense>
    ),
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
