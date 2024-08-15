import Axios from "../Axios";

export default {
  checkoutPayment: (body: string, config: object) =>
    Axios.post("/api/get-snap-token", body, config).then((res) => res),
};
