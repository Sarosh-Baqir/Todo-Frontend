import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      //alert(token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // const refreshToken = localStorage.getItem("refreshToken");
        // if (!refreshToken) {
        //   // Handle case where refresh token is missing
        //   alert("No refresh token found, please log in again.");
        //   window.location.href = "/login";
        //   return Promise.reject(error);
        // }

        // console.log("Retrieved refresh token from localStorage:", refreshToken);

        // // Request new access token using refresh token
        // const response = await axios.post(
        //   "http://localhost:5000/api/users/refreshToken",
        //   { token: refreshToken }
        // );

        // const newAccessToken = response.data.accessToken;
        // const newRefreshToken = response.data.refreshToken;

        // console.log("new access token:", newAccessToken);
        // console.log("new refresh token:", newRefreshToken);

        // // Update local storage with the new tokens
        // localStorage.setItem("accessToken", newAccessToken);
        // localStorage.setItem("refreshToken", newRefreshToken);

        // // Retry the failed request with the new token
        // error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // // Make the retry request with the new token
        // return axios(error.config);
        localStorage.removeItem("token");
        alert("Session expired, please log in again.");
        window.location.href = "/";
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("token");
        alert("Session expired, please log in again.");
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
