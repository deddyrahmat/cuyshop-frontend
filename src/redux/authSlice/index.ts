import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AuthSliceType {
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
      state.token = "";
      state.role = "";
      state.id = 0;
      state.email = "";
      state.name = "";
    },
    RESET_AUTH_STATE: () => initialState,
  },
});

export const { USER_LOGIN, USER_LOGOUT, RESET_AUTH_STATE } = AuthSlice.actions;

export default AuthSlice.reducer;
