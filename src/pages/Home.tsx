import React from "react";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import ListCardProducts from "../components/organisms/ListCardProducts";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <ListCardProducts />
      <Footer />
    </>
  );
};

export default Home;
