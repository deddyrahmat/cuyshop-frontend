import { useEffect, useState } from "react";
import { handleSearchProducts } from "../../../services/products";
import { PaginationData, Product } from "../../../types/containerTypes";

// interface ProductImage {
//   id: number;
//   product_id: number;
//   image: string[];
//   display_order: number;
//   created_at: string;
//   updated_at: string;
// }

// interface Product {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   price: string;
//   product_images: ProductImage[];
// }

// interface PaginationLinks {
//   url: string | null;
//   label: string;
//   active: boolean;
// }

// interface PaginationData {
//   current_page: number;
//   data: Product[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   next_page_url: string | null;
//   path: string;
//   per_page: number;
//   prev_page_url: string | null;
//   to: number;
//   total: number;
//   links: PaginationLinks[];
// }

const useProductsSearch = (keyword: string | undefined, perPage: number) => {
  const [dataProducts, setDataProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    const res = await handleSearchProducts(page, keyword!, perPage);
    if (res) {
      setDataProducts(res?.data?.data?.data);
      setPagination(res?.data?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, keyword]);

  return {
    dataProducts,
    loading,
    pagination,
    currentPage,
    setCurrentPage,
  };
};

export default useProductsSearch;
