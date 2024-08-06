export interface CartType {
  price?: string;
  id?: number;
  title?: string;
  slug?: string;
  thumbnail?: string;
  total?: number;
}

export interface CartSliceType {
  data: CartType[];
}
