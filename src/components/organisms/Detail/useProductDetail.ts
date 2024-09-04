import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../redux/hooks";
import { SET_CARTPAGE } from "../../../redux/cartSlice";
import { handleDetailProduct } from "../../../services/products";
import { formatRupiah } from "../../../utils/currency/Rupiah";

interface Product {
  id: number;
  price: number;
  title: string;
  slug: string;
  weight: number;
  description: string;
  category: { name: string };
  product_images: ImageItem[];
}

interface ImageItem {
  image: string[];
  display_order: number;
}

export const useProductDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [listPhotoIndex, setListPhotoIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartProduct, setCartProduct] = useState<any>({});

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await handleDetailProduct(params.productId ?? "");
        if (isMounted) {
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
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [params.productId]);

  const openModal = useCallback((indexImage: number) => {
    setIsOpen(true);
    setPhotoIndex(indexImage);
  }, []);

  const imageUrl = useMemo(() => {
    const mainImage = items[listPhotoIndex];
    // Ambil elemen pertama dari array `image`, atau gunakan fallback "/image/no-image.png" jika kosong
    return mainImage?.image[0]
      ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${mainImage.image[0]}`
      : "/image/no-image.png";
  }, [items, listPhotoIndex]);

  const handleCart = useCallback(() => {
    const cartProduct = {
      price: product?.price,
      id: product?.id,
      title: product?.title,
      slug: product?.slug,
      weight: product?.weight,
      thumbnail: imageUrl,
      total: 1,
    };

    setCartProduct(cartProduct);
    Swal.fire({
      title: "Sukses!",
      text: "Produk berhasil masuk ke keranjang!",
      icon: "success",
      customClass: {
        confirmButton: "customButtonSwal",
      },
    });
  }, [product, imageUrl]);

  useEffect(() => {
    if (Object.keys(cartProduct).length > 0) {
      dispatch(
        SET_CARTPAGE({
          data: cartProduct,
        })
      );
    }
  }, [cartProduct, dispatch]);

  return {
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
  };
};
