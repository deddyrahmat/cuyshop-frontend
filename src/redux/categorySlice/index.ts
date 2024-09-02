import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a more specific type for the category
interface Category {
  label: string;
  href: string;
}

export interface CategorySliceType {
  data: Category[];
  fetched: boolean;
}

const initialState: CategorySliceType = {
  data: [],
  fetched: false,
};

export const CategorySlice = createSlice({
  name: "categoryStore",
  initialState,
  reducers: {
    SET_CATEGORIES: (state, action: PayloadAction<Category[]>) => {
      if (!state.fetched) {
        state.data = action.payload;
        state.fetched = true;
      }
    },
    RESET_CATEGORY_STATE: () => initialState,
  },
});

export const { SET_CATEGORIES, RESET_CATEGORY_STATE } = CategorySlice.actions;

export default CategorySlice.reducer;
