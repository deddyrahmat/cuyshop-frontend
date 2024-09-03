import { useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { handleListAddresses } from "../../../services/addresses";
import { SET_ADDRESS } from "../../../redux/addressSlice";
import { handleLogin } from "../../../services/auth";
import { USER_LOGIN } from "../../../redux/authSlice";

interface ValuesLogin {
  email: string;
  password: string;
}

const useAuthLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getListAddresses = useCallback(async () => {
    const response = await handleListAddresses();
    if (response?.data) {
      dispatch(SET_ADDRESS({ data: response?.data }));
    }
  }, [dispatch]);

  const formik = useFormik<ValuesLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please input the email field"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Please input the password field"),
    }),
    onSubmit: async (values) => {
      const process = await handleLogin(values);
      if (process.status) {
        dispatch(USER_LOGIN(process.data.data));
        await getListAddresses();
        toast.success(process.message);
        navigate("/", { replace: true });
      } else {
        toast.error(process.message);
      }
    },
  });

  return { formik };
};

export default useAuthLogin;
