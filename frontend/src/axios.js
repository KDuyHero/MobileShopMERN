import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 300000,
});

instance.saveAccessToken = (token) => {
  window.localStorage.setItem("token", token);
};

instance.saveRefreshToken = (token) => {
  window.localStorage.setItem("refresh_token", token);
};

instance.getAccessToken = () => {
  return window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : null;
};

instance.getRefreshToken = () => {
  return window.localStorage.getItem("refresh_token")
    ? window.localStorage.getItem("refresh_token")
    : null;
};

// xử lý data trước khi xuống server
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// sử lý data sau khi response từ server
instance.interceptors.response.use(
  async (response) => {
    // get config of request has this response
    let config = response.config;

    // api don't need login
    if (
      config.url.indexOf("/users/signin") >= 0 ||
      config.url.indexOf("/users/signup") >= 0 ||
      config.url.indexOf("/products") >= 0 ||
      config.url.indexOf("/users/refresh-token") >= 0
    ) {
      return response;
    }

    // api need login
    let { code, message } = response.data;
    if (code && code === 401) {
      if (message && message === "jwt expired") {
        // token hết hạn
        //call refresh_token api to get new token
        const { newToken } = (
          await instance.post("/users/refresh-token", {
            refresh_token: instance.getRefreshToken(),
          })
        ).data;
        // after has newToken
        if (newToken) {
          // set headers with new token
          config.headers["Authorization"] = "bearer " + newToken;
          // save new token
          instance.saveAccessToken(newToken);
          // call prev api
          return instance(config);
        }
      }
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
