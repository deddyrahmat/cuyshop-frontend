import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AddressSliceType {
  data: Record<string, any>;
  province: Record<string, any>[];
}

const localAddress: any = localStorage.getItem("address");
const initialState: AddressSliceType = localAddress
  ? JSON.parse(localAddress)
  : {
      data: {},
      province: [],
    };

export const AddressSlice = createSlice({
  name: "addressStore",
  initialState,
  reducers: {
    SET_ADDRESS: (
      state,
      action: PayloadAction<{
        data: Record<string, any>;
      }>
    ) => {
      console.log("action.payload", action.payload);
      state.data = action.payload.data;
    },
    SET_PROVINCE: (
      state,
      action: PayloadAction<{
        province: Record<string, any>[];
      }>
    ) => {
      state.province = action.payload.province;
    },
    RESET_ADDRESS_STATE: () => initialState,
  },
});

export const { SET_ADDRESS, SET_PROVINCE, RESET_ADDRESS_STATE } =
  AddressSlice.actions;

export default AddressSlice.reducer;
