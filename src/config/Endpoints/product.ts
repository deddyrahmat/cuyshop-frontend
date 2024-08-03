import Axios from "../Axios";

export default {
  listProducts: (config: object) =>
    Axios.get(`/api/products`, config).then((res) => res),
  detailProduct: (config: object, slug: string) =>
    Axios.get(`/api/products/${slug}`, config).then((res) => res),
};
