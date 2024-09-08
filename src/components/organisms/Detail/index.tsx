import React from "react";
import Lightbox from "react-18-image-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaShoppingCart } from "react-icons/fa";
import parse from "html-react-parser";

import "react-18-image-lightbox/style.css";
import "swiper/css";
import "swiper/css/navigation";
import { useProductDetail } from "./useProductDetail";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import SkeletonImage from "../../atoms/SkeletonImage";
import { handleImageError } from "../../../utils/image/OnError";
import Button from "../../atoms/Button";

const Detail: React.FC = () => {
  const {
    handleGoBack,
    product,
    items,
    isOpen,
    photoIndex,
    listPhotoIndex,
    isLoading,
    imageUrl,
    openModal,
    setListPhotoIndex,
    handleCart,
    setIsOpen,
    setPhotoIndex,
  } = useProductDetail();

  if (isLoading) {
    return (
      <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
        <SkeletonImage reverse={false} />
      </section>
    );
  }

  return (
    <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      <Button
        className="mb-8  !font-normal"
        statusButton="custom"
        onClick={() => handleGoBack()}
        type={"button"}
      >
        <div className="flex items-center gap-2">
          <FaChevronLeft />
          <span>Kembali</span>
        </div>
      </Button>
      <section className="flex flex-col md:flex-row justify-center items-start gap-4 ">
        {isOpen && items.length > 0 && (
          <Lightbox
            mainSrc={`${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${
              Array.isArray(items[photoIndex]?.image)
                ? items[photoIndex].image[0]
                : String(items[photoIndex]?.image)
            }`}
            nextSrc={
              photoIndex < items.length - 1
                ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${
                    Array.isArray(items[photoIndex + 1]?.image)
                      ? items[photoIndex + 1].image[0]
                      : String(items[photoIndex + 1]?.image)
                  }`
                : undefined
            }
            prevSrc={
              photoIndex > 0
                ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${
                    Array.isArray(items[photoIndex - 1]?.image)
                      ? items[photoIndex - 1].image[0]
                      : String(items[photoIndex - 1]?.image)
                  }`
                : undefined
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + items.length - 1) % items.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % items.length)
            }
          />
        )}
        <section className="w-full md:w-4/12 lg:w-3/12 bg-white p-4 lg:p-6">
          <img
            onClick={() => openModal(listPhotoIndex)}
            className="p-8 rounded-t-lg mx-auto cursor-pointer h-full max-h-64 md:max-h-80 object-contain"
            src={imageUrl}
            alt="product image"
            onError={handleImageError}
          />

          <section className="mt-4 relative p-0 m-0">
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {items.map((item, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img
                    src={`${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${Array.isArray(item?.image) ? item.image[0] : item?.image}`}
                    onClick={() => setListPhotoIndex(index)}
                    className="rounded-lg h-24 md:h-28 w-full object-contain"
                    onError={handleImageError}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </section>
        <section className="w-full md:w-8/12 lg:w-9/12 bg-white p-4 lg:p-6">
          <p className="text-gray-500 text-xs lg:text-sm mb-3 capitalize">
            {product?.category?.name}
          </p>
          <h2 className="text-gray-900 text-2xl lg:text-3xl font-semibold mb-3">
            {product?.title}
          </h2>
          <h2 className="text-gray-900 text-xl lg:text-2xl font-semibold mb-3">
            {formatRupiah(String(product?.price))}
          </h2>
          <div className="text-gray-700 text-sm lg:text-base">
            {parse(product?.description ?? "")}
          </div>

          <div className="mt-4">
            <button
              onClick={handleCart}
              className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Add to cart
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Detail;
