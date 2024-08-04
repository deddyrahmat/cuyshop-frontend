import React from "react";
import CategoryMenu from "../components/organisms/CategoryMenu";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

const Categories: React.FC = () => {
  return (
    <>
      <Header />
      <CategoryMenu />
      <Footer />
    </>
  );
};

export default Categories;
