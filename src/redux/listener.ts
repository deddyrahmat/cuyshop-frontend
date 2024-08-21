// import { setAuthToken } from "../config/Axios";
import storeRedux from "./store";
import { AuthSliceType } from "./authSlice/index"; // Pastikan tipe diimpor dengan benar
import { setAuthToken } from "../config/Axios";
import { AddressSliceType } from "./addressSlice";

let currentAuth: AuthSliceType = storeRedux.getState().auth;
let currentAddress: AddressSliceType = storeRedux.getState().address;

function listener() {
  const previousAuth = currentAuth;
  const previousAddress = currentAddress;
  currentAuth = storeRedux.getState().auth;
  currentAddress = storeRedux.getState().address;

  // console.log("currentAuth", currentAuth);
  // Gunakan perbandingan mendalam jika perlu
  if (JSON.stringify(currentAuth) !== JSON.stringify(previousAuth)) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));
    setAuthToken(currentAuth.token);
  }
  // console.log("currentAddress", currentAddress);
  // console.log("previousAddress", previousAddress);
  if (JSON.stringify(currentAddress) !== JSON.stringify(previousAddress)) {
    localStorage.setItem("address", JSON.stringify(currentAddress));
  }
}

function listen() {
  storeRedux.subscribe(listener);
}

export default listen;
