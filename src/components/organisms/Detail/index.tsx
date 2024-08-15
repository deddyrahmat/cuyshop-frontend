import React, { useEffect, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";

import "react-18-image-lightbox/style.css"; // Make sure to import the stylesheet
import "swiper/css";
import "swiper/css/navigation";
import { isEmpty } from "../../../utils/array/CheckValueEmpty";
import { handleDetailProduct } from "../../../services/products";
import { formatRupiah } from "../../../utils/currency/Rupiah";
import SkeletonImage from "../../atoms/SkeletonImage";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { SET_CARTPAGE } from "../../../redux/cartSlice";
import { CartType } from "../../../types/containerTypes";
import Swal from "sweetalert2";

interface ImageItem {
  image: string;
  display_order: number;
}

interface CategoryItem {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  quantity: number;
  description: string;
  published: number;
  available: number;
  price: string;
  weight: number;
  created_by: number;
  updated_by: number;
  category: CategoryItem;
  category_id: number;
  deleted_at: string | null;
  deleted_by: number | null;
  created_at: string;
  updated_at: string;
  product_images: ImageItem[];
}

const Detail: React.FC = () => {
  // const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();

  // const { email } = useAppSelector((state: any) => {
  //   return state.auth;
  // });

  const [product, setProduct] = useState<Product | null>(null);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [listPhotoIndex, setListPhotoIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await handleDetailProduct(params.productId ?? "");
        const data = response.data.data;
        setProduct(data);

        const sortedImages = data.product_images
          .filter((img: ImageItem) => img.display_order > 0)
          .sort(
            (a: ImageItem, b: ImageItem) => a.display_order - b.display_order
          )
          .map((img: ImageItem) => ({
            image: img.image[0],
            display_order: img.display_order,
          }));

        setItems(sortedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.productId]);

  const openModal = (indexImage: number) => {
    setIsOpen(true);
    setPhotoIndex(indexImage);
  };

  useEffect(() => {
    window.global = window as never;
  }, []);

  const [cartProduct, setCartProduct] = useState<CartType>({});

  const handleCart = () => {
    setCartProduct({
      price: product?.price,
      id: product?.id,
      title: product?.title,
      slug: product?.slug,
      weight: product?.weight,
      thumbnail: imageUrl,
      total: 1,
    });
    // toast.success("Produk berhasil masuk ke keranjang");
    Swal.fire({
      title: "Sukses!",
      text: "Produk berhasil masuk ke keranjang!",
      icon: "success",
    });
  };

  useEffect(() => {
    if (Object.keys(cartProduct).length > 0) {
      // console.log("CartProduct", cartProduct);
      dispatch(
        SET_CARTPAGE({
          data: cartProduct,
        })
      );
    }
  }, [cartProduct, dispatch]);

  if (isLoading) {
    return (
      <section className="2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1 ">
        <SkeletonImage reverse={false} />
      </section>
    );
  }

  const mainImage = items[listPhotoIndex];
  const imageUrl = mainImage?.image
    ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${mainImage.image}`
    : "/image/no-image.png";

  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-4 2xl:container 2xl:mx-auto py-5 px-8 2xl:px-1">
      {isOpen && items.length > 0 && (
        <Lightbox
          mainSrc={`${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${items[photoIndex].image}`}
          nextSrc={
            photoIndex < items.length - 1
              ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${items[photoIndex + 1]?.image}`
              : undefined
          }
          prevSrc={
            photoIndex > 0
              ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${items[photoIndex - 1]?.image}`
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
          onClick={() => {
            openModal(listPhotoIndex);
          }}
          className="p-8 rounded-t-lg mx-auto cursor-pointer h-full max-h-64 md:max-h-80"
          src={imageUrl}
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
                    className={`border-2 ${
                      listPhotoIndex === indexItem
                        ? "border-green-600"
                        : "border-gray-200 hover:border-green-600"
                    } rounded-lg cursor-pointer`}
                  >
                    <img
                      onClick={() => {
                        setListPhotoIndex(indexItem);
                      }}
                      className="p-1 mx-auto"
                      src={`${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${item.image}`}
                      alt="proimport CartProduct from '../CartProduct/index';
duct image"
                    />
                  </article>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </section>
      {product && (
        <section className="w-full md:w-8/12 lg:w-9/12 bg-white p-4 lg:p-6">
          <h1 className="font-bold text-2xl">{product.title}</h1>
          <p className="mb-3 lg:mb-5 text-gray-600 capitalize">
            Category: {product?.category?.name}
          </p>
          <p className="text-lg font-semibold text-green-600 mb-3">
            {formatRupiah(product.price)}
          </p>
          <div
            className="mb-3 lg:mb-5"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <article className="flex items-center gap-2">
            <span className="w-1/12 text-lg font-semibold">Stok</span>
            <span className="w-11/12 text-lg font-semibold">
              : {product.quantity}
            </span>
          </article>
          <button
            className="flex items-center gap-3 mt-6 bg-green-600 rounded-md text-white px-6 py-3"
            onClick={() => handleCart()}
          >
            <span>
              <FaShoppingCart className="text-xl" />
            </span>
            <span className="text-xl">Tambah ke keranjang</span>
          </button>
        </section>
      )}
    </section>
  );
};

export default Detail;
