import axios from "axios";
import Cookies from "js-cookie";

export const http = axios.create({
    baseURL: "https://iraniansepehr.com/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});
export const httpFormData = axios.create({
    baseURL: "https://iraniansepehr.com/api/",
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

http.interceptors.response.use(undefined, error => {
  if(!error.response && error.code === "ERR_NETWORK") {
    console.log(error)
    window.location.href = "/dashboard/accessDenied"
    // navigate('/dashboard')
  }
})

// http.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (!error.response && error.request) {
//             Cookies.remove("token");
//             window.location.reload();
//             return Promise.reject(error);
//         }

//         if (error.respons && !originalRequest._retry) {
//             originalRequest._retry = true;
//             Cookies.remove("token");
//             window.location.reload();
//         }
//         return Promise.reject(error);
//     }
// );
