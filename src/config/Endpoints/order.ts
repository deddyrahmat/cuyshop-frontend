import Axios from "../Axios";

export default {
  listOrder: (config: object) =>
    Axios.get(`/api/order`, config).then((res) => res),
  store: (body: string, config: object) =>
    Axios.post("/api/order", body, config).then((res) => res),
};
