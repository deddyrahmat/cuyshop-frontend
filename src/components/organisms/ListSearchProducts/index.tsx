import React from "react";
import { useEffect, useState } from "react";
import { handleSearchProducts } from "../../../services/products";
import CardWithImage from "../../molecules/CardWithImage";
import Pagination from "../../molecules/Pagination";
import SkeletonCard from "../../atoms/SkeletonCard";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { useParams } from "react-router-dom";

interface ProductImage {
  id: number;
  product_id: number;
  image: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  product_images: ProductImage[];
  // Tambahkan properti lain yang diperlukan
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationData {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: PaginationLinks[];
}

const ListSearchProducts: React.FC = () => {
  const [dataProducts, setDataProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { keyword } = useParams();
  const listProducts = async (page = 1) => {
    const res = await handleSearchProducts(page, keyword!, 10);
    if (res) {
      setDataProducts(res?.data?.data?.data);
      setPagination(res?.data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    listProducts(currentPage);
  }, [currentPage, keyword]);

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      <section className="flex lg:items-end flex-col lg:flex-row  gap-4 mb-5">
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

      {dataProducts?.length === 0 && (
        <p className="min-h-[40vh] text-center text-xl lg:text-3xl font-bold mt-10">
          Produk Tidak Ditemukan
        </p>
      )}
      {!isEmpty(dataProducts) && (
        <section className="flex justify-center mt-8 lg:mt-10">
          {pagination &&
            pagination?.from !== 1 &&
            pagination?.last_page !== 1 && (
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
