import React, { useEffect, useState } from "react";
import { createSelector } from "reselect";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProducts,
  SET_CHILDPAGE,
  SET_PARENTPAGE,
} from "../../../redux/productSlice";
import CardWithImage from "../../molecules/CardWithImage";
import Pagination from "../../molecules/Pagination";
import SkeletonCard from "../../atoms/SkeletonCard";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { Product, PaginationData } from "../../../types/containerTypes";
import { useParams } from "react-router-dom";

const selectProductData = (state: { product: { data: any } }) =>
  state.product.data;
const selectCurrentPageKey = (state: { product: { childPageKey: any } }) =>
  state.product.childPageKey;

const makeSelectProductData = createSelector(
  [selectCurrentPageKey, selectProductData],
  (currentPageKey, productData) => ({
    allProducts: productData || {},
    pageNow: currentPageKey || "",
    data: productData[currentPageKey]?.data || [],
    isLoading: productData[currentPageKey]?.isLoading || false,
    fetched: productData[currentPageKey]?.fetched || false,
    pagination: productData[currentPageKey]?.pagination || null,
  })
);

interface ProductListProps {
  slug?: string;
}

const ProductList: React.FC<ProductListProps> = ({ slug }) => {
  const dispatch = useAppDispatch();

  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageName = params.slug ?? "home";

  const {
    pageNow,
    data: stateProducts,
    isLoading,
    fetched,
    pagination,
    allProducts,
  } = useAppSelector(makeSelectProductData);

  useEffect(() => {
    // if (Object.keys(allProducts).includes(currentPageName) === false) {
    if (!allProducts[currentPageName]) {
      // Set Parent Page Data
      dispatch(
        SET_PARENTPAGE({
          parentPage: params.slug ? "category" : "home",
          parentPageKey: params.slug ? "category" : "home",
        })
      );

      // Set Child Page Data
      dispatch(
        SET_CHILDPAGE({
          childPage: params.slug ?? "home",
          childPageKey: params.slug ?? "home",
          data: {
            data: [],
            fetched: false,
            isLoading: true,
            pagination: null,
          },
        })
      );

      // Fetch Products
      dispatch(
        fetchProducts({
          page: currentPage,
          slug: params.slug ?? slug,
        })
      );
    }
  }, [dispatch, params.slug, currentPage]);

  // Update Child Page Data with Fetched Products
  useEffect(() => {
    // if (Object.keys(allProducts).includes(currentPageName) && fetched) {
    if (allProducts[currentPageName] && fetched) {
      dispatch(
        SET_CHILDPAGE({
          childPage: params.slug ?? "home",
          childPageKey: params.slug ?? "home",
          data: {
            data: allProducts[currentPageName]?.data, // Keep old data and add new data
            fetched: true,
            isLoading: false,
            pagination: pagination, // Update if pagination is available
          },
        })
      );
    }
  }, [dispatch, fetched, stateProducts, params.slug, pagination]);

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
            currentPage={stateProducts?.pagination?.currentPage}
            lastPage={stateProducts?.pagination?.last_page} // Assuming 10 items per page
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      )}
    </section>
  );
};

export default ProductList;
