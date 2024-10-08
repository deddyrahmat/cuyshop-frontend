/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartSliceReduxType } from "../../types/containerTypes";

const initialState: CartSliceReduxType = {
  data: [],
};

export const CartSlice = createSlice({
  name: "cartStore",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    SET_CARTPAGE: (
      state,
      action: PayloadAction<{
        data: Record<string, any>;
      }>
    ) => {
      // const { data } = action.payload;

      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    },
    INCREMENT_ITEM: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item) {
        item.total += 1;
      }
    },
    DECREMENT_ITEM: (state, action: PayloadAction<{ id: number }>) => {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (item && item.total > 1) {
        item.total -= 1;
      }
    },
    REMOVE_ITEM: (state, action: PayloadAction<{ id: number }>) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    RESET_CART_STATE: () => initialState,
  },
});

export const {
  SET_CARTPAGE,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  REMOVE_ITEM,
  RESET_CART_STATE,
} = CartSlice.actions;

export default CartSlice.reducer;
