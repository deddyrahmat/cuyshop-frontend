import Axios from "../Axios";

export default {
  listCategories: (config: object) =>
    Axios.get(`/api/categories`, config).then((res) => res),
};
