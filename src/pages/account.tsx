import React from "react";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import AccountContent from "../components/organisms/AccountContent";

const Account: React.FC = () => {
  return (
    <>
      <Header />
      <AccountContent />
      <Footer />
    </>
  );
};

export default Account;
