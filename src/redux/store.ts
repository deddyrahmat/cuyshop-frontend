import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index";
import cartReducer from "./cartSlice/index";
import addressReducer from "./addressSlice/index";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
