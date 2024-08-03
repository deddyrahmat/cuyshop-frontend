import React from "react";
import AuthLogin from "../components/organisms/AuthLogin";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <AuthLogin />
      <Footer />
    </>
  );
};

export default Login;
