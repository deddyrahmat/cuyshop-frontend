import React from "react";
import { useEffect, useState } from "react";

import { handleProducts } from "../../../services/products";
import { useParams } from "react-router-dom";
import SkeletonCard from "../../atoms/SkeletonCard";
import Card from "../../molecules/Card";
import Pagination from "../../molecules/Pagination";

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

const CategoryMenu: React.FC = () => {
  const params = useParams();

  const [dataProducts, setDataProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const listProducts = async (page = 1) => {
      const res = await handleProducts(page, params.kategoriId);
      if (res) {
        setDataProducts(res?.data?.data?.data);
        setPagination(res?.data?.data);
      }
      setLoading(false);
    };
    listProducts(currentPage);
  }, [currentPage, params.kategoriId]);

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      <section className="flex lg:items-end flex-col lg:flex-row gap-2 mb-5">
        <h1 className="font-bold capitalize">Kategori {params.kategoriId}</h1>
        <hr className="w-11/12 border border-green-600" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 4 }).map((_data, index) => (
              <SkeletonCard key={index} />
            ))
          : dataProducts.map((product: Product) => (
              <Card key={product.id} product={product} />
            ))}
      </section>
      <section className="flex justify-center mt-8 lg:mt-10">
        {pagination && (
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </section>
    </section>
  );
};

export default CategoryMenu;
