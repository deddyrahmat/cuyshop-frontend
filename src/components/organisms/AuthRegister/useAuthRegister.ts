import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { ValuesRegister } from "../../../types/containerTypes";
import { handleRegister } from "../../../services/auth";
import { USER_LOGIN } from "../../../redux/authSlice";

const useAuthRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<ValuesRegister>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input the field"),
      email: Yup.string()
        .email("check format email")
        .required("Please input the field"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Please input the field"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values: ValuesRegister) => {
      const process = await handleRegister(values);
      if (!process.status) {
        toast.error(process.message);
        return;
      }
      dispatch(USER_LOGIN(process.data.data));
      toast.success(process.message);
      navigate("/", { replace: true });
    },
  });

  return { formik };
};

export default useAuthRegister;
