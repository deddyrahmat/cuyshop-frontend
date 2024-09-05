import React from "react";
import CardWithImage from "../../molecules/CardWithImage";
import Pagination from "../../molecules/Pagination";
import SkeletonCard from "../../atoms/SkeletonCard";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { useProductList } from "./useListCardProducts";
import { Product } from "../../../types/containerTypes";

const ProductList: React.FC = () => {
  const {
    stateProducts,
    isLoading,
    fetched,
    pagination,
    currentPage,
    setCurrentPage,
  } = useProductList();

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      {isLoading && (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>
      )}

      {!isLoading && fetched && stateProducts.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stateProducts?.map((product: Product) => (
            <CardWithImage key={product.id} product={product} />
          ))}
        </section>
      )}

      {!isLoading && stateProducts.length === 0 && (
        <p className="text-center text-xl lg:text-3xl font-bold mt-10">
          Produk Tidak Tersedia
        </p>
      )}

      {!isLoading && !isEmpty(stateProducts) && (
        <section className="flex justify-center mt-8 lg:mt-10">
          <Pagination
            currentPage={pagination?.currentPage || currentPage}
            lastPage={pagination?.last_page || 1}
            onPageChange={setCurrentPage}
          />
        </section>
      )}
    </section>
  );
};

export default ProductList;
