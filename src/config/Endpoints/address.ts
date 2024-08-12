import Axios from "../Axios";

export default {
  listProvincies: (config: object) =>
    Axios.get(`/api/provinces`, config).then((res) => res),
  listCities: (config: object) =>
    Axios.get(`/api/cities`, config).then((res) => res),
  listAddresses: (config: object) =>
    Axios.get(`/api/address`, config).then((res) => res),
  detail: (config: object, slug: string) =>
    Axios.get(`/api/address/${slug}`, config).then((res) => res),
  store: (body: string, config: object) =>
    Axios.post("/api/address", body, config).then((res) => res),
  update: (body: string, config: object, id: number) =>
    Axios.patch(`/api/address/${id}`, body, config).then((res) => res),
  remove: (config: object, id: number) =>
    Axios.delete(`/api/address/${id}`, config).then((res) => res),
};
