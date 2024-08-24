/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface OrderSliceType {
  data: Record<string, any>[];
}

const initialState: OrderSliceType = {
  data: [],
};

export const OrderSlice = createSlice({
  name: "orderStore",
  initialState,
  reducers: {
    SET_ORDERPAGE: (
      state,
      action: PayloadAction<{
        data: Record<string, any>;
      }>
    ) => {
      // const { data } = action.payload;

      return {
        ...state,
        data: [...state.data, ...action.payload.data],
      };
    },
    RESET_ORDER_STATE: () => initialState,
  },
});

export const { SET_ORDERPAGE, RESET_ORDER_STATE } = OrderSlice.actions;

export default OrderSlice.reducer;
