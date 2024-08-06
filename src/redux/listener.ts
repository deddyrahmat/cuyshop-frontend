import { setAuthToken } from "../config/Axios";
import storeRedux from "./store";
import { AuthSliceType } from "./authSlice/index"; // Pastikan tipe diimpor dengan benar

let currentAuth: AuthSliceType = storeRedux.getState().auth;

function listener() {
  const previousAuth = currentAuth;
  currentAuth = storeRedux.getState().auth;

  // Gunakan perbandingan mendalam jika perlu
  if (JSON.stringify(currentAuth) !== JSON.stringify(previousAuth)) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));
    setAuthToken(currentAuth.token);
  }
}

function listen() {
  storeRedux.subscribe(listener);
}

export default listen;
