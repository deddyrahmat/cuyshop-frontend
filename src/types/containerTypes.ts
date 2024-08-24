import { ReactNode } from "react";

// products
export interface ProductImage {
  id: number;
  product_id: number;
  image: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  product_images: ProductImage[];
}

// orders
export interface Order {
  address: AddressValues;
  created_at: string | number | Date;
  id: number;
  total_price: string;
  order_items: string;
  snap_url: string;
  status: string;
  address_id: string;
}

export interface DataItem {
  id: string;
  Penerima: string;
  Total: string;
  "Status Pembayaran": string;
  "Tanggal Pembelian": string;
  Action: ReactNode; // Update untuk menerima ReactNode
}

// pagination
export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationData<T = any> {
  // Menambahkan <T = any> di sini untuk mendefinisikan T sebagai tipe generik
  current_page: number;
  data: T[]; // Menggunakan T sebagai tipe untuk data
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: PaginationLinks[];
}
// cart type

export interface CartType {
  price?: string;
  id?: number;
  title?: string;
  slug?: string;
  weight?: number;
  thumbnail?: string;
  total?: number;
}

export interface CartSliceType {
  data: CartType[];
}

// cost type
export interface Cost {
  value: number;
  etd: string;
  note: string;
}

export interface ServiceOption {
  service: string;
  description: string;
  cost: Cost[];
}

// address type
export interface ProvinceValues {
  id: string;
  name: string;
}
export interface CityValues {
  id: string;
  name: string;
  postal_code: string;
}
export interface AddressValues {
  id?: number;
  fullname: string;
  phone: string;
  address: string;
  province_id: string;
  city_id: string;
  province?: ProvinceValues;
  city?: CityValues;
  other: string;
  main: boolean;
  location: string;
}

// order type
export interface OrderValues {
  total_price: number;
  address: number;
  order_items: string;
  fullname: string;
  email: string;
}
