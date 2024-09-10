import { RouterProvider } from "react-router-dom";
import { router } from "./route/routes";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import storeRedux from "./redux/store";
import listen from "./redux/listener";
import { setAuthToken } from "./config/Axios";

const App: React.FC = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { token } = JSON.parse(auth);
    setAuthToken(token);
  }
  useEffect(() => {
    listen(); // Pastikan listener diaktifkan
  }, []);
  return (
    <>
      <Provider store={storeRedux}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
