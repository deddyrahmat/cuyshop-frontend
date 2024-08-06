import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

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
  // Tambahkan properti lain yang diperlukan
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const mainImage = product.product_images.find(
    (image: ProductImage) => image.display_order === 1
  );
  const imageUrl = mainImage?.image[0]
    ? `${import.meta.env.VITE_URL_PUBLIC_STORAGE}/${mainImage.image[0]}`
    : "/image/no-image.png";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <a href={`/product/${product.slug}`}> */}
      <Link to={`/product/${product.slug}`}>
        <img
          className="p-8 rounded-t-lg mx-auto"
          src={imageUrl}
          alt={`${product.title} image`}
        />
      </Link>
      {/* </a> */}
      <div className="px-5 pb-5">
        <Link to={`/product/${product.slug}`}>
          {/* <a href={`/product/${product.slug}`}> */}
          <h5 className="line-clamp-2 text-md md:text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </Link>
        {/* </a> */}
        <p className="line-clamp-3 text-sm text-gray-700 dark:text-gray-300 mt-3 mb-4">
          {parse(product.description)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm lg:text-lg font-bold text-gray-500 dark:text-white">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
