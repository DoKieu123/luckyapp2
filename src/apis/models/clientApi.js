import axiosClient from "../axiosClient";

const SCHEMA = "client";

const clientApi = {
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
  updateById(id,data) {
    const url = `/${SCHEMA}/${id}.json`;
    return axiosClient.patch(url,data);
  },
};

export default clientApi;
