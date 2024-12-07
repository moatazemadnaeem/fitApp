import axios from "axios";
const getToken = () => {
  return sessionStorage.getItem("jwt");
};
const AxiosInstance = axios.create({
  baseURL: "http://localhost:9000/api/v1/",
  headers: {
    authentication: getToken(),
  },
});
const protectedUrls = [
  "users/current_user",
  "users/signout",
  "fitclasses/create_class",
  "fitclasses/edit_class",
  "fitclasses/delete_class",
  "fitclasses/book_class",
  "fitclasses/cancel_class",
  "fitclasses/get_booked_classes",
  "fitclasses/get_created_classes",
];
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    const url = config.url!;
    if (protectedUrls.includes(url)) {
      if (!token) {
        return Promise.reject();
      }
      if (token) {
        config.headers["authentication"] = `${token}`;
      }
    }

    return config;
  },
  () => {
    return Promise.reject();
  }
);
export { AxiosInstance };
