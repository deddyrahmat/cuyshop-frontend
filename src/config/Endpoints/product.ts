import Axios from "../Axios";

export default {
  listProducts: (config: object) =>
    Axios.get(`/api/products`, config).then((res) => res),
  detailProduct: (config: object, id: number) =>
    Axios.get(`/api/products/${id}`, config).then((res) => res),
};
