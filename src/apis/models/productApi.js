import axiosClient from "../axiosClient";

const SCHEMA = "product";

const productApi = {
  getAll() {
    const url = `/${SCHEMA}.json`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/${SCHEMA}.json`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/${SCHEMA}.json`;
    return axiosClient.patch(url, JSON.stringify(data));
  },
};

export default productApi;