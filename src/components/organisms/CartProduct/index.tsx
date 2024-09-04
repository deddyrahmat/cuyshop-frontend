import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaExchangeAlt, FaRegTrashAlt } from "react-icons/fa";
import "react-18-image-lightbox/style.css";
import "swiper/css";
import "swiper/css/navigation";
import Button from "../../atoms/Button";
import FormCustomSelect from "../../molecules/FormCustomSelect";
import DefaultCard from "../../molecules/DefaultCard";
import Modal from "../../molecules/Modal";
import FormRadio from "../../molecules/FormRadio";
import Skeleton from "../../atoms/Skeleton";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import { useCartProductLogic } from "./useCartProductLogic";
import {
  AddressValues,
  CartType,
  ServiceOption,
} from "../../../types/containerTypes";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { handleImageError } from "../../../utils/image/OnError";

const CartProduct: React.FC = () => {
  const {
    formik,
    isModalOpen,
    openModal,
    closeModal,
    dataAddress,
    selectedAddress,
    handleSelectedAddress,
    kurirOptions,
    isLoadingService,
    resultCourier,
    handleService,
    handleGetDataService,
    totalCost,
    dataCart,
    handleIncrement,
    handleDecrement,
    handleRemove,
  } = useCartProductLogic();

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
              {dataCart?.map((cart: CartType, cartIndex: number) => (
                <section
                  className="flex flex-col md:flex-row md:items-start  gap-4 p-4 lg:p-6 bg-white"
                  key={cartIndex}
                >
                  <figure className="w-5/12 mx-auto lg:mx-0">
                    <img
                      src={cart.thumbnail}
                      alt={`${cart.title} Image`}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                    />
                  </figure>
                  <section className="flex flex-col justify-start items-start w-full">
                    <h1 className="text-xl font-semibold line-clamp-2">
                      {cart.title}
                    </h1>
                    <h2 className="text-sm font-semibold text-green-900">
                      {formatRupiah(cart.price)}
                    </h2>
                    <p className="text-sm text-gray-500">{cart.weight} Gram</p>
                  </section>
                  <section className="flex items-center w-full md:w-4/12 pt-3 gap-6">
                    <Button
                      onClick={() => handleDecrement(cart.id!)}
                      statusButton="custom"
                      className="text-xl md:text-3xl cursor-pointer"
                      type={"button"}
                    >
                      <CiCircleMinus size={24} />
                    </Button>
                    <p>{cart.total}</p>

                    <Button
                      onClick={() => handleIncrement(cart.id!)}
                      statusButton="custom"
                      className="text-xl md:text-3xl cursor-pointer"
                      type={"button"}
                    >
                      <CiCirclePlus size={24} />
                    </Button>
                    <Button
                      onClick={() => handleRemove(cart.id!)}
                      statusButton="custom"
                      className="text-xl md:text-3xl cursor-pointer"
                      type={"button"}
                    >
                      <FaRegTrashAlt
                        size={24}
                        className=" text-red-800 cursor-pointer"
                      />
                    </Button>
                  </section>
                </section>
              ))}
            </section>

            {/* side order */}
            <section className="w-full md:w-4/12 bg-white p-4 lg:p-6 rounded-md">
              <h1 className="font-medium mt-2 mb-4 ">Ringkasan Belanja</h1>
              {!isEmpty(selectedAddress) && selectedAddress && (
                <DefaultCard
                  onClick={() => {
                    openModal();
                  }}
                >
                  <article className="flex-grow text-left space-y-2 w-full">
                    <section className="flex gap-2">
                      <h6 className="capitalize">{selectedAddress.fullname}</h6>
                      <span className=" font-normal">|</span>
                      <span className="font-normal hover:!text-white">
                        {selectedAddress.phone}
                      </span>
                    </section>
                    <p className="text-sm font-normal">{`${selectedAddress.address} ${selectedAddress.other}`}</p>
                    <p className="text-sm font-normal uppercase">{`${selectedAddress?.province?.name}, ${selectedAddress?.city?.name} ,${selectedAddress?.city?.postal_code}`}</p>
                  </article>
                  <div className="mt-5 flex gap-1 items-center">
                    <FaExchangeAlt />
                    <span className=" text-sm font-light">Ganti Tujuan</span>
                  </div>
                </DefaultCard>
              )}
              <h3 className="font-medium mt-3 mb-2 ">Pesanan</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <FormCustomSelect
                  label="Kurir"
                  name="courier"
                  options={kurirOptions}
                  value={formik.values.courier}
                  onChange={(selectedOption: any) => {
                    formik.setFieldValue("courier", selectedOption.value);
                    handleService(selectedOption.value);
                  }}
                  isSearchable
                />
                <section>
                  {isLoadingService ? (
                    <Skeleton />
                  ) : (
                    <>
                      <p className="font-semibold ">Pilihan Layanan</p>
                      <article className="grid grid-cols-2 gap-4">
                        {resultCourier?.length > 0 &&
                          resultCourier?.map(
                            (courier: ServiceOption, indexCourier: number) => (
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
                                      {formatRupiah(
                                        String(courier?.cost[0].value)
                                      )}
                                    </p>
                                  </div>
                                </section>
                              </FormRadio>
                            )
                          )}
                      </article>
                    </>
                  )}
                </section>
                <p className="font-bold">
                  Total Biaya : {formatRupiah(String(totalCost))}
                </p>
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
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default CartProduct;
