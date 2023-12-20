//Axios cung cấp các phương thức đơn giản để thực hiện các loại yêu cầu khác nhau như GET, POST, PUT, DELETE, vv. đến các địa chỉ URL mong muốn.
import axios from "axios";
//Gửi yêu cầu HTTP đến một Firebase API (hoặc một API khác được cung cấp thông qua biến môi trường).
const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(// hàm được gọi trước khi một yêu cầu đc gửi
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(// hàm này được gọi khi một phản hồi được nhận 
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;