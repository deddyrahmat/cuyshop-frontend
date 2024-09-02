import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSliceType } from "../../types/containerTypes";

const localAuth: any = localStorage.getItem("auth");
const initialState: AuthSliceType = localAuth
  ? JSON.parse(localAuth)
  : { token: "", name: "", id: 0, email: "", role: "" };

export const AuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    USER_LOGIN: (state, action: PayloadAction<AuthSliceType>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    USER_LOGOUT: (state) => {
      localStorage.removeItem("auth");
      // console.log("Removed auth:", localStorage.getItem("auth")); // This should log `null`
      state.token = "";
      state.role = "";
      state.id = 0;
      state.email = "";
      state.name = "";
    },
    // RESET_AUTH_STATE: () => initialState,
  },
});

export const { USER_LOGIN, USER_LOGOUT } = AuthSlice.actions;

export default AuthSlice.reducer;
