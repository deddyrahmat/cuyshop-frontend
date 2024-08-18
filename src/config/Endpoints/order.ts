import Axios from "../Axios";

export default {
  store: (body: string, config: object) =>
    Axios.post("/api/order", body, config).then((res) => res),
};
