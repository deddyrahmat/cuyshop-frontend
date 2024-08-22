import React from "react";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import ListSearchProducts from "../components/organisms/ListSearchProducts";

const Search: React.FC = () => {
  return (
    <>
      <Header />
      <ListSearchProducts />
      <Footer />
    </>
  );
};

export default Search;
