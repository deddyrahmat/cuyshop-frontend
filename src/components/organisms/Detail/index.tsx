import { useEffect, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";

import "react-18-image-lightbox/style.css"; // Pastikan Anda mengimpor stylesheet-nya
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";

function Detail() {
  interface ImageItem {
    image: string;
  }

  const dataImage: ImageItem[] = [
    {
      image: "/dummy/black.png",
    },
    {
      image: "/dummy/green.png",
    },
    {
      image: "/dummy/red.png",
    },
    {
      image: "/dummy/white-red.png",
    },
    {
      image: "/dummy/white.png",
    },
  ];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [listPhotoIndex, setListPhotoIndex] = useState<number>(0);

  useEffect(() => {
    console.log("dataImage", dataImage);
    setItems(dataImage);
  }, [dataImage]);

  // Fungsi untuk membuka modal
  const openModal = (indexImage: number) => {
    setIsOpen(true);
    setPhotoIndex(indexImage); //index untuk urutan image dalam 1 produk
  };

  useEffect(() => {
    window.global = window as never;
  }, []);

  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-4 2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      {isOpen && items && (
        // <Lightbox
        //   nextSrc={items[(photoIndex + 1) % items.length].image}
        //   prevSrc={items[(photoIndex + items.length - 1) % items.length].image}
        // />
        <Lightbox
          mainSrc={dataImage[photoIndex].image}
          nextSrc={
            photoIndex < dataImage.length - 1
              ? dataImage[photoIndex + 1]?.image
              : undefined
          }
          prevSrc={
            photoIndex > 0 ? dataImage[photoIndex - 1]?.image : undefined
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex(photoIndex - 1)}
          onMoveNextRequest={() => setPhotoIndex(photoIndex + 1)}
        />
      )}
      <section className="w-full md:w-4/12 lg:w-3/12 bg-white p-4 lg:p-6 ">
        <img
          onClick={() => {
            openModal(listPhotoIndex);
          }}
          className="p-8 rounded-t-lg mx-auto cursor-pointer h-full max-h-64 md:max-h-80"
          src={items[listPhotoIndex]?.image}
          alt="product image"
        />

        <section className="mt-4 relative p-0 m-0">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={false}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {!isEmpty(items) &&
              items.map((item: ImageItem, indexItem: number) => (
                <SwiperSlide key={`detail-${indexItem}`}>
                  <article
                    className={`border-2 ${listPhotoIndex === indexItem ? "border-green-600" : "border-gray-200 hover:border-green-600"}  rounded-lg cursor-pointer`}
                  >
                    <img
                      onClick={() => {
                        setListPhotoIndex(indexItem);
                      }}
                      className="p-1 mx-auto"
                      src={item.image}
                      alt="product image"
                    />
                  </article>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </section>
      <section className="w-full md:w-8/12 lg:w-9/12 bg-white p-4 lg:p-6">
        <h1 className="font-bold text-2xl ">Red Dragon</h1>
        <p className="mb-3 lg:mb-5 text-gray-600 ">Man</p>
        {/* <hr className="mt-2 mb-3 border-2 border-gray-300" /> */}
        <p className="text-lg font-semibold text-green-600 mb-3">Rp. 80.000</p>
        <p className="mb-3 lg:mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fugit
          dignissimos dolores error accusamus maiores culpa, asperiores voluptas
          esse quo officiis sed, dolorum recusandae architecto ea laboriosam
          dolore. Ipsum, illo?
        </p>

        <article className="flex items-center gap-2">
          <span className="w-1/12 text-lg font-semibold">Stok</span>
          <span className="w-11/12 text-lg font-semibold">: 88</span>
        </article>
        <button className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white px-6 py-3">
          <span>
            <FaShoppingCart className="text-xl" />
          </span>
          <span className="text-xl">Tambah ke keranjang</span>
        </button>
      </section>
    </section>
  );
}

export default Detail;
