import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleCategories } from "../../../services/categories";
import { handleLogout } from "../../../services/auth";
import { SET_CATEGORIES } from "../../../redux/categorySlice";
import { USER_LOGOUT } from "../../../redux/authSlice";
import { RESET_ADDRESS_STATE } from "../../../redux/addressSlice";
import { RESET_CART_STATE } from "../../../redux/cartSlice";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import Swal from "sweetalert2";

const useHeaderLogic = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useAppSelector((state) => state.auth);
  const { data: dataCart } = useAppSelector((state) => state.cart);
  const { data: stateCategories, fetched } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (!fetched) {
      handleCategories().then((res) => {
        if (res) {
          const formattedData = res.data.data.map(
            (item: { name: string; slug: string }) => ({
              label: item.name,
              href: `/kategori/${item.slug}`,
            })
          );
          dispatch(SET_CATEGORIES(formattedData));
        }
      });
    }
  }, [fetched, dispatch]);

  const processLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Keluar",
      text: "Apakah kamu ingin keluar?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      padding: "2em",
      customClass: {
        confirmButton: "customButtonSwal",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleLogout();
        if (res?.status) {
          dispatch(USER_LOGOUT());
          dispatch(RESET_ADDRESS_STATE());
          dispatch(RESET_CART_STATE());
          navigate("/", { replace: true });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        Swal.fire({
          icon: "warning",
          title: "Batal!",
          text: "Kamu tetap login",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  return {
    isOpen,
    setIsOpen,
    dataCart,
    stateCategories,
    email,
    navigate,
    processLogout,
    isEmpty,
  };
};

export default useHeaderLogic;
