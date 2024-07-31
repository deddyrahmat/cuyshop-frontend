import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";

function AuthRegister() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("check format email")
        .required("Please input the field"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Please input the field"),
    }),
    onSubmit: (values: any) => {
      console.log("values", values);
      toast.success("process.message");
    },
  });
  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[50vh] lg:py-0">
      <section className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <section className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Email"
              placeholder="Email"
              unique="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              // formikTouched={formik.touched.email}
              formikTouched={!!formik.touched.email}
              formikError={
                typeof formik.errors.email === "string"
                  ? formik.errors.email
                  : undefined
              } // Konversi menjadi string atau undefined
            />
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Password"
              placeholder="Password"
              unique="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              // formikTouched={formik.touched.password}
              formikTouched={!!formik.touched.password}
              formikError={
                typeof formik.errors.password === "string"
                  ? formik.errors.password
                  : undefined
              } // Konversi menjadi string atau undefined
            />

            <section className="flex items-center justify-between">
              <a
                href="http://google.com"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </section>
            <Button
              className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white py-3 w-full justify-center"
              type="submit"
              statusButton="primary"
            >
              Login
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register
              </Link>
            </p>
          </form>
        </section>
      </section>
    </section>
  );
}

export default AuthRegister;
