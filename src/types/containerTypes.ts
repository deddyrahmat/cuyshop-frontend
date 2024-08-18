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

// "SQLSTATE[23000]: Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails (`cuyshop`.`orders`, CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE) (Connection: mariadb, SQL: insert into `orders` (`updated_by`, `address_id`, `total_price`, `updated_at`, `created_at`) values (2, 358, 206000, 2024-08-18 09:59:28, 2024-08-18 09:59:28))"
