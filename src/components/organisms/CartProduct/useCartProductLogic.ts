import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  AddressSliceType,
  AuthSliceType,
  CartSliceType,
  ServiceOption,
  CartType,
  AddressValues,
} from "../../../types/containerTypes";
import { handleCheckShiping } from "../../../services/shipping";
import { handleStorOrder } from "../../../services/order";
import {
  REMOVE_ITEM,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
} from "../../../redux/cartSlice";

export const useCartProductLogic = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userAuth = useAppSelector(
    (state: { auth: AuthSliceType }) => state.auth
  );
  const { data: dataCart } = useAppSelector(
    (state: { cart: CartSliceType }) => state.cart
  );
  const { data: dataAddress } = useAppSelector(
    (state: { address: AddressSliceType }) => state.address
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultCourier, setResultCourier] = useState<ServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceOption>();
  const [selectedAddress, setSelectedAddress] = useState<AddressValues>();
  const [isLoadingService, setIsLoadingService] = useState<boolean>(false);

  useEffect(() => {
    if (dataAddress.length > 0) {
      setSelectedAddress(dataAddress.find((addr: any) => addr.main === 1));
    } else {
      toast.warning("Silahkan tambahkan alamat");
      navigate("/settings");
    }
  }, [dataAddress, navigate]);

  const formik = useFormik({
    initialValues: {
      courier: "",
      service: "",
      total: 0,
    },
    validationSchema: Yup.object({
      courier: Yup.string().required("Please input the field"),
      service: Yup.string(),
      total: Yup.number(),
    }),
    onSubmit: async () => {
      if (selectedAddress && typeof selectedAddress.id === "number") {
        const resp = await handleStorOrder({
          fullname: userAuth?.name,
          address: +selectedAddress?.id,
          total_price: +totalCost,
          email: userAuth?.email,
          order_items: JSON.stringify([
            dataCart,
            selectedAddress,
            selectedService,
          ]),
        });
        if (resp?.data) {
          window.location.href = resp?.data?.data?.snap_url?.original?.snap_url;
        }
      }
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        customClass: {
          confirmButton: "customButtonSwal",
        },
      });
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectedAddress = (id: number) => {
    setSelectedAddress(dataAddress.find((addr: any) => addr.id === id));
    closeModal();
  };

  const handleService = async (paramCourier: string) => {
    setIsLoadingService(true);
    const totalWeight = dataCart.reduce((accumulator, item) => {
      return accumulator + (item.weight ?? 0) * (item.total ?? 1);
    }, 0);
    const response = await handleCheckShiping({
      destination: `${selectedAddress?.city_id}`,
      weight: totalWeight,
      courier: paramCourier,
    });
    setResultCourier(response?.data);
    setIsLoadingService(false);
  };

  const handleGetDataService = (service: string) => {
    const result = resultCourier.find(
      (item: ServiceOption) => item.service === service
    );
    setSelectedService(result);
  };

  const totalCostItem = useMemo(() => {
    return dataCart.reduce((accumulator: number, item: CartType) => {
      const price = parseFloat(item.price!);
      return accumulator + price * item.total!;
    }, 0);
  }, [dataCart]);

  const totalCostService = useMemo(() => {
    return selectedService?.cost[0]?.value ?? 0;
  }, [selectedService]);

  const totalCost = useMemo(() => {
    return totalCostItem + totalCostService;
  }, [totalCostItem, totalCostService]);

  useEffect(() => {
    formik.setFieldValue("total", totalCost);
  }, [totalCost]);

  const handleIncrement = (id: number) => dispatch(INCREMENT_ITEM({ id }));
  const handleDecrement = (id: number) => dispatch(DECREMENT_ITEM({ id }));
  const handleRemove = (id: number) => dispatch(REMOVE_ITEM({ id }));

  return {
    formik,
    isModalOpen,
    openModal,
    closeModal,
    dataAddress,
    selectedAddress,
    handleSelectedAddress,
    kurirOptions: [
      { value: "jne", label: "JNE" },
      { value: "pos", label: "Pos Indonesia" },
      { value: "tiki", label: "Tiki" },
    ],
    isLoadingService,
    resultCourier,
    handleService,
    handleGetDataService,
    totalCost,
    dataCart,
    handleIncrement,
    handleDecrement,
    handleRemove,
  };
};
