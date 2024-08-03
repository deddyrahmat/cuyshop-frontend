import React from "react";
import CartProduct from "../components/organisms/CartProduct";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

const Cart: React.FC = () => {
  return (
    <>
      <Header />
      <CartProduct />
      <Footer />
    </>
  );
};

export default Cart;
