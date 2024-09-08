import { useEffect, useState } from "react";
import { handleSearchProducts } from "../../../services/products";
import { PaginationData, Product } from "../../../types/containerTypes";

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
