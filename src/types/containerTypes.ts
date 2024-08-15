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
