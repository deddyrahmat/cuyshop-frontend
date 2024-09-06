import React from "react";
import { useParams } from "react-router-dom";
import CardWithImage from "../../molecules/CardWithImage";
import Pagination from "../../molecules/Pagination";
import SkeletonCard from "../../atoms/SkeletonCard";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { Product } from "../../../types/containerTypes";
import useProductsSearch from "./useProductsSearch";

const ListSearchProducts: React.FC = () => {
  const { keyword } = useParams();
  const { dataProducts, loading, pagination, setCurrentPage } =
    useProductsSearch(keyword, 10);

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      <section className="flex lg:items-end flex-col lg:flex-row gap-4 mb-5">
        <h1 className="font-bold capitalize">Pencarian : {keyword}</h1>
        <hr className="flex-grow border border-green-600" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 4 }).map((_data, index) => (
              <SkeletonCard key={index} />
            ))
          : dataProducts.map((product: Product) => (
              <CardWithImage key={product.id} product={product} />
            ))}
      </section>

      {dataProducts?.length === 0 && !loading && (
        <p className="min-h-[40vh] text-center text-xl lg:text-3xl font-bold mt-10">
          Produk Tidak Ditemukan
        </p>
      )}

      {!isEmpty(dataProducts) && (
        <section className="flex justify-center mt-8 lg:mt-10">
          {pagination && pagination?.last_page !== 1 && (
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default ListSearchProducts;
