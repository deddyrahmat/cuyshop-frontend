import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { formatRupiah } from "../../../utils/currency/Rupiah";

interface ProductImage {
  id: number;
  product_id: number;
  image: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  product_images: ProductImage[];
}

interface CardProps {
  product: Product;
}

const CardWithImage: React.FC<CardProps> = ({ product }) => {
  const mainImage = product.product_images.find(
    (image: ProductImage) => image.display_order === 1
  );
  const imageUrl = mainImage?.image[0]
    ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${Array.isArray(mainImage?.image) ? mainImage.image[0] : mainImage?.image}`
    : "/image/no-image.png";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between min-h-[400px]">
      <Link to={`/produk/${product.slug}`}>
        <img
          className="rounded-t-lg mx-auto object-contain h-auto max-h-60 w-full pt-4 pb-3"
          src={imageUrl}
          alt={`${product.title} image`}
        />
      </Link>
      <div className="px-5 pb-5 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/produk/${product.slug}`}>
            <h5 className="line-clamp-2 text-md md:text-lg lg:text-xl font-semibold tracking-tight text-gray-900 ">
              {product.title}
            </h5>
          </Link>
          <div className="line-clamp-3 text-sm text-gray-700 mt-3 mb-4">
            {parse(product.description)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm lg:text-lg font-bold text-gray-500 ">
            {formatRupiah(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardWithImage;
