import React from "react";
import Inputs from "../../atoms/Inputs";
import Button from "../../atoms/Button";
import { FaSearch } from "react-icons/fa";

interface TypeSearch {
  classNames: string;
  formik: any;
}

const FormSearch: React.FC<TypeSearch> = ({ classNames, formik }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`w-9/12 md:w-4/12 lg:w-3/12 flex items-center lg:ml-auto ps-3 pe-3 p-2 gap-3 bg-white rounded-lg md:rounded-xl ${classNames} `}
    >
      <Inputs
        type="search"
        placeholder="Cari Produk"
        className="w-full focus:outline-none"
        value={formik.values.keyword}
        onChange={formik.handleChange}
        id="keyword"
      />
      <Button type="submit" className="text-green-700" statusButton="custom">
        <FaSearch />
      </Button>
    </form>
  );
};

export default FormSearch;
