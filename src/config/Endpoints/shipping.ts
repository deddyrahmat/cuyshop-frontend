import Axios from "../Axios";

export default {
  check: (body: string, config: object) =>
    Axios.post("/api/check-shipping-cost", body, config).then((res) => res),
};
