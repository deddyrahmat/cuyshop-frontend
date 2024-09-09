import React from "react";
import { Link } from "react-router-dom";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";
import useAuthRegister from "./useAuthRegister";

const AuthRegister: React.FC = () => {
  const { formik } = useAuthRegister();

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[50vh] lg:py-0">
      <section className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
        <section className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Daftar Akun
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
              "
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              unique="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              formikTouched={!!formik.touched.name}
              formikError={formik.errors.name}
            />
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
              "
              label="Email"
              placeholder="Email"
              unique="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              formikTouched={!!formik.touched.email}
              formikError={formik.errors.email}
            />
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
              "
              label="Password"
              placeholder="Password"
              unique="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              formikTouched={!!formik.touched.password}
              formikError={formik.errors.password}
            />
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
              "
              label="Konfirmasi Password"
              placeholder="Konfirmasi Password"
              unique="password_confirmation"
              type="password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              formikTouched={!!formik.touched.password_confirmation}
              formikError={formik.errors.password_confirmation}
            />

            <Button
              className="flex items-center gap-3 mt-6  rounded-md text-white py-3 w-full justify-center"
              type="submit"
              statusButton={formik.isSubmitting ? "disabled" : "primary"}
              isDisabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading" : "Daftar"}
            </Button>
            <p className="text-sm font-light text-gray-500 ">
              Apakah kamu sudah punya akun?{" "}
              <Link
                to="/masuk"
                className="font-medium text-primary-600 hover:underline "
              >
                Masuk
              </Link>
            </p>
          </form>
        </section>
      </section>
    </section>
  );
};

export default AuthRegister;
