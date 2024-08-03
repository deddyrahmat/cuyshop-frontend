// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import React from "react";
import { ToastContainer } from "react-toastify";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode> */}
    <App />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <ToastContainer />
    {/* </React.StrictMode> */}
  </>
);
