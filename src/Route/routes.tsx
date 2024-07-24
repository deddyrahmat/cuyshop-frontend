import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loading from "../components/atoms/Loading";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

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
    path: "*",
    element: (
      <Suspense fallback={<Loading type="xl" />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
