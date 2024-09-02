import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, PaginationData } from "../../types/containerTypes";
import { handleProducts } from "../../services/products";

// Define initial state
interface ProductDataState {
  data: Product[];
  fetched: boolean;
  isLoading: boolean;
  pagination: PaginationData | null;
}

interface ProductSlice {
  parentPage: string;
  parentPageKey: string;
  childPage: string;
  childPageKey: string;
  data: Record<string, ProductDataState>;
}

const initialState: ProductSlice = {
  parentPage: "",
  parentPageKey: "",
  childPage: "",
  childPageKey: "",
  data: {},
};

// Thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, slug }: { page?: number; slug?: string }) => {
    const response = await handleProducts(page, slug);
    return response.data; // Pastikan data sesuai dengan struktur yang diharapkan
  }
);

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    SET_PARENTPAGE: (
      state,
      action: PayloadAction<{
        parentPage: string;
        parentPageKey: string;
      }>
    ) => {
      const { parentPage, parentPageKey } = action.payload;
      state.parentPage = parentPage;
      state.parentPageKey = parentPageKey;
    },
    SET_CHILDPAGE: (
      state,
      action: PayloadAction<{
        childPage: string;
        childPageKey: string;
        data: ProductDataState;
      }>
    ) => {
      const { childPage, childPageKey, data } = action.payload;
      return {
        ...state,
        childPage,
        childPageKey,
        data: {
          ...state.data,
          [childPageKey]: {
            ...state.data[childPageKey],
            ...data,
          },
        },
      };
    },
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        const currentPageKey = state.childPageKey || state.parentPageKey;
        if (currentPageKey) {
          state.data[currentPageKey] = {
            ...state.data[currentPageKey],
            isLoading: true,
          };
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const currentPageKey = state.childPageKey || state.parentPageKey;
        if (currentPageKey) {
          state.data[currentPageKey] = {
            data: action.payload.data.data,
            pagination: action.payload.data,
            isLoading: false,
            fetched: true,
          };
        }
      })
      .addCase(fetchProducts.rejected, (state) => {
        const currentPageKey = state.childPageKey || state.parentPageKey;
        if (currentPageKey) {
          state.data[currentPageKey] = {
            ...state.data[currentPageKey],
            isLoading: false,
          };
        }
      });
  },
});

export const { resetProductState, SET_PARENTPAGE, SET_CHILDPAGE } =
  productSlice.actions;
export default productSlice.reducer;
