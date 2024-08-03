import React from "react";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import OrderContent from "../components/organisms/OrderContent";

const Orders: React.FC = () => {
  return (
    <>
      <Header />
      <OrderContent />
      <Footer />
    </>
  );
};

export default Orders;
