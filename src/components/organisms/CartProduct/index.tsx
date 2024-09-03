import React, { useEffect, useMemo, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

import "react-18-image-lightbox/style.css"; // Pastikan Anda mengimpor stylesheet-nya
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Button from "../../atoms/Button";
import FormCustomSelect from "../../molecules/FormCustomSelect";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  AddressSliceType,
  AddressValues,
  AuthSliceType,
  CartSliceType,
  CartType,
  ServiceOption,
} from "../../../types/containerTypes";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import {
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from "../../../redux/cartSlice";
import DefaultCard from "../../molecules/DefaultCard";
import Modal from "../../molecules/Modal";
import { handleCheckShiping } from "../../../services/shipping";
import FormRadio from "../../molecules/FormRadio";
import Skeleton from "../../atoms/Skeleton";
import { handleStorOrder } from "../../../services/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartProduct: React.FC = () => {
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

  useEffect(() => {
    // setSelectedAddress(dataAddress.find((addr: any) => addr.main === 1));
    if (dataAddress.length > 0) {
      setSelectedAddress(dataAddress.find((addr: any) => addr.main === 1));
    } else {
      toast.warning("Silahkan tambahkan alamat");
      navigate("/settings");
    }
  }, [dataAddress, navigate]);
  // console.log("selectedAddress", selectedAddress);

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

          // window.open(resp?.data?.data?.snap_url?.original?.snap_url);
        }
      }

      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    },
  });

  const kurirOptions = [
    { value: "jne", label: "JNE" },
    { value: "pos", label: "Pos Indonesia" },
    { value: "tiki", label: "Tiki" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectedAddress = (id: number) => {
    setSelectedAddress(dataAddress.find((addr: any) => addr.id === id));
    closeModal();
  };

  const [isLoadingService, setIsLoadingService] = useState<boolean>(false);
  const handleService = async (paramCourier: string) => {
    setIsLoadingService(true);
    const totalWeight = dataCart.reduce((accumulator, item) => {
      // Mengakumulasi weight berdasarkan quantity
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

  // sdfsd
  // Total cost of items
  const totalCostItem = useMemo(() => {
    return dataCart.reduce((accumulator: number, item: CartType) => {
      const price = parseFloat(item.price!);
      return accumulator + price * item.total!;
    }, 0);
  }, [dataCart]);

  // Total cost of the selected service
  const totalCostService = useMemo(() => {
    return selectedService?.cost[0]?.value ?? 0;
  }, [selectedService]);

  // Combined total cost
  const totalCost = useMemo(() => {
    return totalCostItem + totalCostService;
  }, [totalCostItem, totalCostService]);

  // Example effect to update Formik or other states
  useEffect(() => {
    formik.setFieldValue("total", totalCost);
  }, [totalCost]);

  return (
    <>
      <Modal isOpen={isModalOpen} title="Alamat" onClose={closeModal}>
        <section className="grid grid-rows-1 gap-4 items-start">
          {dataAddress.length > 0 &&
            dataAddress.map((list: AddressValues, addrexIndex: number) => (
              <DefaultCard
                key={addrexIndex}
                onClick={() => handleSelectedAddress(list.id!)}
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
              </DefaultCard>
            ))}
        </section>
      </Modal>
      <section className="flex flex-col md:flex-row justify-center items-start gap-4 2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1 min-h-[50vh] ">
        {dataCart?.length === 0 ? (
          <section className="flex flex-col justify-center items-center space-y-6 mt-5">
            <h1 className="text-2xl font-semibold text-green-900">
              Cart Kosong
            </h1>
            <img
              src="/image/ilustration/empty-cart.png"
              alt="empty cart"
              className="w-full h-full md:w-6/12 md:h-6/12 object-contain rounded-t-full"
            />
            <p className="text-3xl font-semibold  text-green-900">
              Yuk Belanja
            </p>
          </section>
        ) : (
          <>
            {/* side product */}
            <section className="w-full md:w-8/12 rounded-md space-y-4">
              {!isEmpty(dataCart) &&
                dataCart.length > 0 &&
                dataCart.map((item: CartType, indexCart: number) => (
                  <article
                    key={indexCart}
                    className="flex items-start gap-4 bg-white p-4 lg:p-6"
                  >
                    <div className="w-2/12">
                      <img
                        src={item.thumbnail}
                        alt={`${item.title} Image`}
                        className="h-full w-full max-w-52 max-h-52 rounded-md"
                      />
                    </div>
                    <div className="w-7/12">
                      <p className="text-lg">{item.title}</p>
                      <p className="text-green-600 text-xl mt-3 font-bold">
                        {formatRupiah(item?.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.weight} Gram
                      </p>
                    </div>
                    <div className="w-3/12 flex items-center gap-4">
                      <FaRegTrashAlt
                        className="text-xl md:text-2xl mr-5 text-red-800 cursor-pointer"
                        onClick={() => dispatch(REMOVE_ITEM({ id: item.id! }))}
                      />
                      <CiCircleMinus
                        className="text-xl md:text-3xl cursor-pointer"
                        onClick={() =>
                          dispatch(DECREMENT_ITEM({ id: item.id! }))
                        }
                      />
                      <span className="text-xl">{item.total}</span>
                      <CiCirclePlus
                        className="text-xl md:text-3xl cursor-pointer"
                        onClick={() =>
                          dispatch(INCREMENT_ITEM({ id: item.id! }))
                        }
                      />
                    </div>
                  </article>
                ))}
            </section>

            {/* side shiping */}
            <section className="w-full md:w-4/12 bg-white p-4 lg:p-6 rounded-md">
              <article>
                {!isEmpty(selectedAddress) && selectedAddress && (
                  <DefaultCard
                    onClick={() => {
                      openModal();
                    }}
                  >
                    <article className="flex-grow text-left space-y-2">
                      <section className="flex gap-2">
                        <h6 className="capitalize">
                          {selectedAddress.fullname}
                        </h6>
                        <span className=" font-normal">|</span>
                        <span className="font-normal hover:!text-white">
                          {selectedAddress.phone}
                        </span>
                      </section>
                      <p className="text-sm font-normal">{`${selectedAddress.address} ${selectedAddress.other}`}</p>
                      <p className="text-sm font-normal uppercase">{`${selectedAddress?.province?.name}, ${selectedAddress?.city?.name} ,${selectedAddress?.city?.postal_code}`}</p>
                    </article>
                  </DefaultCard>
                )}
                <h3 className="font-medium mt-3 mb-2 ">Pesanan</h3>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <FormCustomSelect
                    label="Kurir"
                    name="courier" // Sesuaikan dengan nama field dalam formik
                    options={kurirOptions}
                    value={formik.values.courier}
                    onChange={(selectedOption: any) => {
                      formik.setFieldValue("courier", selectedOption.value);
                      handleService(selectedOption.value);
                    }}
                    isSearchable
                  />
                  {isLoadingService && <Skeleton />}
                  {!isEmpty(resultCourier) &&
                    resultCourier &&
                    Array.isArray(resultCourier) && (
                      <>
                        <p className="font-semibold ">Pilihan Layanan</p>
                        <article className="grid grid-cols-2 gap-4">
                          {resultCourier.map(
                            (courier: any, indexCourier: number) => (
                              <FormRadio
                                key={indexCourier}
                                placeholder="Nama Service"
                                unique={`service-${indexCourier}`}
                                type="radio"
                                value={courier.service}
                                checked={
                                  formik.values.service === courier.service
                                }
                                onChange={() =>
                                  formik.setFieldValue(
                                    "service",
                                    courier.service
                                  )
                                }
                                formikTouched={!!formik.touched.service}
                                formikError={
                                  typeof formik.errors.service === "string"
                                    ? formik.errors.service
                                    : undefined
                                }
                              >
                                <section
                                  className={`flex flex-col justify-between h-full p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer ${formik.values.service === courier.service ? "bg-green-700 text-white" : "bg-white text-gray-700"}`}
                                  onClick={() =>
                                    handleGetDataService(courier.service)
                                  }
                                >
                                  <div>
                                    <p className="capitalize font-bold">
                                      {courier?.service}
                                    </p>
                                    <p className="text-sm text-wrap mt-3 font-semibold">
                                      Detail :
                                    </p>
                                    <p className="text-sm text-wrap">
                                      {courier?.description}
                                    </p>
                                    <p className="text-sm text-wrap mt-3 font-semibold">
                                      Estimasi Pengiriman :
                                    </p>
                                    <p className="text-sm text-wrap">
                                      {courier?.cost[0].etd} hari
                                    </p>
                                  </div>
                                  <div className="mt-4">
                                    <p className="text-sm text-wrap font-semibold">
                                      Biaya :
                                    </p>
                                    <p className="text-sm text-wrap">
                                      {formatRupiah(courier?.cost[0].value)}
                                    </p>
                                  </div>
                                </section>
                              </FormRadio>
                            )
                          )}
                        </article>
                      </>
                    )}

                  <p className="font-bold">
                    Total Biaya : {formatRupiah(String(totalCost))}
                  </p>
                  <Button
                    className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white py-3 w-full justify-center"
                    type="submit"
                    statusButton="primary"
                    // isDisabled={true}
                  >
                    <span>
                      <IoBagCheckOutline className="text-xl" />
                    </span>
                    <span className="text-xl">Checkout</span>
                  </Button>
                </form>
              </article>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default CartProduct;
