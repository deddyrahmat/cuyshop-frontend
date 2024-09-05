import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProducts,
  SET_CHILDPAGE,
  SET_PARENTPAGE,
} from "../../../redux/productSlice";
import { createSelector } from "reselect";
import { useParams } from "react-router-dom";

// Selectors
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

// Custom Hook
export const useProductList = (slug?: string) => {
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
    if (!allProducts[currentPageName]) {
      dispatch(
        SET_PARENTPAGE({
          parentPage: params.slug ? "category" : "home",
          parentPageKey: params.slug ? "category" : "home",
        })
      );

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

      dispatch(
        fetchProducts({
          page: currentPage,
          slug: params.slug ?? slug,
        })
      );
    }
  }, [dispatch, params.slug, currentPage]);

  useEffect(() => {
    if (allProducts[currentPageName] && fetched) {
      dispatch(
        SET_CHILDPAGE({
          childPage: params.slug ?? "home",
          childPageKey: params.slug ?? "home",
          data: {
            data: allProducts[currentPageName]?.data,
            fetched: true,
            isLoading: false,
            pagination: pagination,
          },
        })
      );
    }
  }, [dispatch, fetched, stateProducts, params.slug, pagination]);

  return {
    stateProducts,
    isLoading,
    fetched,
    pagination,
    currentPage,
    setCurrentPage,
  };
};
