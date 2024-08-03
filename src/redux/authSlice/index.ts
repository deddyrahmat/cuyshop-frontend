/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthSliceType {
  email: string;
  id: number;
  name: string;
  role: string;
  token: string;
}

const localAuth: any = localStorage.getItem("auth");
const initialState: AuthSliceType = localAuth
  ? JSON.parse(localAuth)
  : { token: "", name: "", id: 0, email: "", role: "" };

export const UserSlice = createSlice({
  name: "userAuth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    USER_LOGIN: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    USER_LOGOUT: (state) => {
      localStorage.removeItem("auth");
      state.token = "";
      state.role = "";
      state.id = 0;
      state.email = "";
      state.name = "";
    },
  },
});

export const { USER_LOGIN, USER_LOGOUT } = UserSlice.actions;

export default UserSlice.reducer;
