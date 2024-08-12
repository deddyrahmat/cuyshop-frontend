import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import DefaultCard from "../../molecules/DefaultCard";
import Button from "../../atoms/Button";
import Modal from "../../molecules/Modal";
import {
  handleListAddresses,
  handleListCities,
  handleListProvincies,
  handleRemoveAddresses,
  handleStoreAddress,
  handleupdateAddress,
} from "../../../services/addresses";
import FormField from "../../molecules/FormField";
import FormCustomSelect from "../../molecules/FormCustomSelect";
import { SET_ADDRESS, SET_PROVINCE } from "../../../redux/addressSlice";
import { useAppDispatch } from "../../../redux/hooks";
import FormCheckbox from "../../molecules/FormCheckbox";
import Swal from "sweetalert2";

interface ProvinceValues {
  id: string;
  name: string;
}
interface CityValues {
  id: string;
  name: string;
  postal_code: string;
}
interface AddressValues {
  id?: number;
  fullname: string;
  phone: string;
  address: string;
  province_id: string;
  city_id: string;
  province?: ProvinceValues;
  city?: CityValues;
  other: string;
  main: boolean;
  location: string;
}

const AddressAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listAddress, setListAddress] = useState<AddressValues[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState<number | null>(null);
  const [listProvincies, setListProvincies] = useState<
    { value: string; label: string }[]
  >([]);
  const [listCities, setListCities] = useState<
    { value: string; label: string }[]
  >([]);

  const getListAddresses = async () => {
    const response = await handleListAddresses();
    if (response) {
      const addresses = response.data.map((address: any) => ({
        ...address,
        main: address.main === 1, // Convert 1 to true and 0 to false
      }));
      setListAddress(addresses);
    }
  };

  const getListProvincies = async () => {
    const responseProvincies = await handleListProvincies();
    if (Array.isArray(responseProvincies?.data)) {
      const options = responseProvincies?.data?.map((item: any) => ({
        value: item.id,
        label: item.text,
      }));
      setListProvincies(options);
    }
  };

  useEffect(() => {
    getListAddresses();
    getListProvincies();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    formik.resetForm();
  };

  const handleChangeCity = async (provinceID: string) => {
    if (!provinceID) {
      return toast.error("Pilih provinsi terlebih dahulu.");
    }

    try {
      const result = await handleListCities(+provinceID);
      if (Array.isArray(result?.data)) {
        const options = result?.data?.map((item: any) => ({
          value: item.id,
          label: item.text,
        }));
        setListCities(options);
        // console.log(options); // Debugging untuk melihat data kota
      }
    } catch (error) {
      toast.error("API tidak merespons, harap periksa API Anda.");
    }
  };

  const handleFormAddressForUpdate = (id: number) => {
    const selectedAddress = listAddress.find((addr) => addr.id === id);
    if (selectedAddress) {
      formik.setValues({
        fullname: selectedAddress.fullname,
        phone: selectedAddress.phone,
        address: selectedAddress.address,
        province_id: selectedAddress.province_id,
        city_id: selectedAddress.city_id,
        other: selectedAddress.other,
        main: selectedAddress.main, // This will be a boolean
        location: selectedAddress.location,
      });
      handleChangeCity(selectedAddress.province_id);
      setCurrentAddressId(id);
      setIsEditMode(true);
      openModal();
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      address: "",
      province_id: "",
      city_id: "",
      other: "",
      main: false,
      location: "home",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Fullname is required")
        .max(255, "Maximum 255 characters"),
      phone: Yup.string()
        .required("Phone is required")
        .max(12, "Maximum 12 characters")
        .min(10, "Minimum 10 characters"),
      address: Yup.string()
        .max(255, "Maximum 255 characters")
        .required("Address is required"),
      province_id: Yup.string().required("Province is required"),
      city_id: Yup.string().required("City is required"),
      other: Yup.string().max(255, "Maximum 255 characters"),
      main: Yup.boolean(),
      location: Yup.string()
        .oneOf(["home", "office"], "Invalid location type")
        .required("Location is required"),
    }),
    onSubmit: async (values: AddressValues) => {
      let process;

      try {
        if (isEditMode && currentAddressId) {
          process = await handleupdateAddress(+currentAddressId, values);
        } else {
          // Create new address
          process = await handleStoreAddress(values);
        }

        if (process.status) {
          toast.success(process.message);
        } else {
          toast.error(process.message);
        }
        getListAddresses();
        closeModal();
      } catch (error) {
        // console.log("Error in onSubmit:", error);
        toast.error("An unexpected error occurred.");
      }
    },
  });

  const handleDeleteAddress = () => {
    Swal.fire({
      icon: "warning",
      title: "Hapus Data",
      text: "Apakah kamu yakin ingin menghapus data ini?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      padding: "2em",
      customClass: "sweet-alerts",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (currentAddressId) {
            const responseDelete =
              await handleRemoveAddresses(currentAddressId);
            if (responseDelete) {
              const resultListAddress = listAddress.filter(
                (list) => list.id !== currentAddressId
              );

              setListAddress(resultListAddress);

              // Update Redux state after deleting
              dispatch(SET_ADDRESS({ data: resultListAddress }));

              closeModal();
            }
          }
        } catch (error) {
          console.log("error", error);
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Gagal untuk menghapus data.",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "warning",
          title: "Batal!",
          text: "Data kamu aman",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(SET_ADDRESS({ data: listAddress }));
    dispatch(SET_PROVINCE({ province: listProvincies }));
  }, [dispatch, listAddress, listProvincies]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title={isEditMode ? "Perbarui Alamat" : "Alamat Baru"}
        onClose={closeModal}
      >
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <FormField
            label="Nama Lengkap"
            unique="fullname"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            formikTouched={formik.touched.fullname}
            formikError={formik.errors.fullname}
          />
          <FormField
            label="Nomor Telepon"
            unique="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.phone}
            onChange={formik.handleChange}
            formikTouched={formik.touched.phone}
            formikError={formik.errors.phone}
          />
          <FormField
            label="Alamat"
            unique="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.address}
            onChange={formik.handleChange}
            formikTouched={formik.touched.address}
            formikError={formik.errors.address}
          />
          <FormCustomSelect
            label="Provinsi"
            name="province_id"
            options={listProvincies}
            value={formik.values.province_id}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "province_id",
                selectedOption ? selectedOption.value : ""
              );
              if (selectedOption) {
                handleChangeCity(selectedOption?.value);
              }
            }}
            error={formik.errors.province_id}
            isSearchable
          />
          <FormCustomSelect
            label="Kabupaten/Kota"
            name="city_id"
            options={listCities}
            value={formik.values.city_id}
            onChange={(selectedOption) => {
              formik.setFieldValue(
                "city_id",
                selectedOption ? selectedOption.value : ""
              );
            }}
            error={formik.errors.city_id}
            isSearchable
          />
          <FormField
            label="Detail Lainnya(contoh: Nomor rumah)"
            unique="other"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formik.values.other}
            onChange={formik.handleChange}
            formikTouched={formik.touched.other}
            formikError={formik.errors.other}
          />
          <FormCheckbox
            label="Atur Sebagai Alamat Utama"
            unique="main"
            className=""
            value={formik.values.main} // Ensure this is a boolean
            onChange={(e) => formik.setFieldValue("main", e.target.checked)} // Convert checkbox value to boolean
            formikTouched={formik.touched.main}
            formikError={formik.errors.main}
          />

          <FormCustomSelect
            label="Tandai Sebagai"
            name="location"
            options={[
              { value: "home", label: "Home" },
              { value: "office", label: "Office" },
            ]}
            value={formik.values.location}
            onChange={(option) =>
              formik.setFieldValue("location", option?.value)
            }
            error={formik.errors.location}
          />

          <Button
            className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white py-3 w-full justify-center"
            type="submit"
            statusButton="primary"
          >
            {isEditMode ? "Perbarui " : "Simpan"}
          </Button>
          {isEditMode && (
            <Button
              className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white py-3 w-full justify-center"
              type="button"
              statusButton="danger"
              onClick={() => handleDeleteAddress()}
            >
              Hapus
            </Button>
          )}
        </form>
      </Modal>
      <section className="grid grid-cols-4 gap-4 items-start">
        {listAddress.length > 0 &&
          listAddress.map((list, addrexIndex) => (
            <DefaultCard
              key={addrexIndex}
              onClick={() => handleFormAddressForUpdate(list?.id)}
            >
              <article className="flex-grow text-left space-y-2">
                <section className="flex gap-2">
                  <h6 className="capitalize">{list.fullname}</h6>
                  <span className=" font-normal">|</span>
                  <span className="font-normal hover:!text-white">
                    {list.phone}
                  </span>
                </section>
                <p className="text-sm font-normal">{`${list.address} ${list.other}`}</p>
                <p className="text-sm font-normal">{`${list?.province?.name}, ${list?.city?.name} ,${list?.city?.postal_code}`}</p>
              </article>
              {list.main ? (
                <p className="text-center mt-4 mb-3 bg-green-500 border border-white text-white py-1 rounded-lg w-4/12">
                  Utama
                </p>
              ) : (
                ""
              )}
            </DefaultCard>
          ))}
      </section>

      <section className="flex justify-center items-center w-full mt-8 lg:mt-12">
        <Button
          className="me-3 "
          statusButton="primary"
          type="button"
          onClick={openModal}
        >
          Tambah alamat baru
        </Button>
      </section>
    </>
  );
};

export default AddressAccount;
