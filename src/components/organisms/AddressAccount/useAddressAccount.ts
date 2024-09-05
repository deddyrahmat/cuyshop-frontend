import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  handleListAddresses,
  handleListCities,
  handleListProvincies,
  handleRemoveAddresses,
  handleStoreAddress,
  handleupdateAddress,
} from "../../../services/addresses";
import { SET_ADDRESS, SET_PROVINCE } from "../../../redux/addressSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { AddressValues } from "../../../types/containerTypes";

export const useAddressAccount = () => {
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
    if (response?.data) {
      setListAddress(response?.data);
    }
  };

  const getListProvincies = async () => {
    const responseProvincies = await handleListProvincies();
    if (Array.isArray(responseProvincies?.data)) {
      const options = responseProvincies?.data.map((item: any) => ({
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
        const options = result?.data.map((item: any) => ({
          value: item.id,
          label: item.text,
        }));
        setListCities(options);
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
        main: selectedAddress.main,
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
        if (listAddress?.length === 0) {
          values.main = true;
        }
        if (isEditMode && currentAddressId) {
          process = await handleupdateAddress(+currentAddressId, values);
        } else {
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
      customClass: {
        popup: "sweet-alerts",
      },
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

              dispatch(SET_ADDRESS({ data: resultListAddress }));
              closeModal();
            }
          }
        } catch (error) {
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

  return {
    isEditMode,
    isModalOpen,
    formik,
    listAddress,
    listProvincies,
    listCities,
    openModal,
    closeModal,
    handleChangeCity,
    handleFormAddressForUpdate,
    handleDeleteAddress,
  };
};
