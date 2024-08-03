import React from "react";
import AuthRegister from "../components/organisms/AuthRegister";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

const Register: React.FC = () => {
  return (
    <>
      <Header />
      <AuthRegister />
      <Footer />
    </>
  );
};

export default Register;
