import Axios from "../Axios";

export default {
  listProducts: (config: object) =>
    Axios.get(`/api/products`, config).then((res) => res),
};
