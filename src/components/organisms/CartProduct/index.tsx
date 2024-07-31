import { IoBagCheckOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

import "react-18-image-lightbox/style.css"; // Pastikan Anda mengimpor stylesheet-nya
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";
import FormCustomSelect from "../../molecules/FormCustomSelect";
import Swal from "sweetalert2";

function CartProduct() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      province: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please input the field"),
      province: Yup.string(),
    }),
    onSubmit: (values: any) => {
      console.log("values", values);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    },
  });

  const countryOptions = [
    { value: "ID", label: "Indonesia" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
  ];

  // const [province, setProvince] = useState(users[0]);
  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-4 2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1 min-h-[50vh] ">
      <section className="w-full md:w-8/12 bg-white p-4 lg:p-6 rounded-md">
        <article className="flex items-start gap-4">
          <div className="w-2/12">
            <img
              src="/dummy/black.png"
              alt="black"
              className="h-full w-full max-w-52 max-h-52 rounded-md"
            />
          </div>
          <div className="w-7/12">
            <p className="text-lg">Red Dragon</p>
            <p className="text-green-600 text-xl mt-3 font-bold">Rp. 88.888</p>
            <p className="text-sm text-gray-500">888 Gram</p>
          </div>
          <div className="w-3/12 flex items-center gap-4">
            <FaRegTrashAlt className="text-xl md:text-2xl mr-5 text-red-800" />
            <CiCircleMinus className="text-xl md:text-3xl" />
            <span className="text-xl">3</span>
            <CiCirclePlus className="text-xl md:text-3xl" />
          </div>
        </article>
      </section>
      <section className="w-full md:w-4/12 bg-white p-4 lg:p-6 rounded-md">
        <article>
          <h3>Pesanan</h3>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <FormField
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Nama Lengkap"
              placeholder="Nama Lengkap"
              unique="fullname"
              type="text"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              // formikTouched={formik.touched.fullname}
              formikTouched={!!formik.touched.fullname}
              formikError={
                typeof formik.errors.fullname === "string"
                  ? formik.errors.fullname
                  : undefined
              } // Konversi menjadi string atau undefined
            />
            <FormCustomSelect
              label="Country"
              name="province" // Sesuaikan dengan nama field dalam formik
              options={countryOptions}
              value={formik.values.province}
              onChange={(selectedOption: any) => {
                formik.setFieldValue("province", selectedOption.value);
              }}
              isSearchable
            />
            <Button
              className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white py-3 w-full justify-center"
              type="submit"
              statusButton="primary"
            >
              <span>
                <IoBagCheckOutline className="text-xl" />
              </span>
              <span className="text-xl">Checkout</span>
            </Button>
          </form>
        </article>
      </section>
    </section>
  );
}

export default CartProduct;
