import Axios from "../Axios";

export default {
  Login: (body: string, config: object) =>
    Axios.post("/api/login", body, config).then((res) => res),
  Register: (body: string, config: object) =>
    Axios.post("/api/register", body, config).then((res) => res),
  Logout: (config: object) =>
    Axios.post("/api/logout", config).then((res) => res),
};
