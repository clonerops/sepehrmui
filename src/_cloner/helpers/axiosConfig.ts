import axios from "axios";
import Cookies from "js-cookie";

export const http = axios.create({
    // baseURL: "https://iraniansepehr.com/api/",
    baseURL: "http://devbama.ir/api/",
    // baseURL: "http://192.168.10.125/api/",
    headers: {        
        // "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
        // mode: 'no-cors',
    },
});
export const httpAuth = axios.create({
    // baseURL: "https://iraniansepehr.com/api/",
    baseURL: "http://devbama.ir/api/",
    // baseURL: "http://192.168.10.125/api/",
    headers: {
        // "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
        // mode: 'no-cors',
    },
});
export const httpFormData = axios.create({
    // baseURL: "https://iraniansepehr.com/api/",
    baseURL: "http://devbama.ir/api/",
    // baseURL: "http://192.168.10.125/api/",
    headers: {
        "Content-Type": "multipart/form-data",
        // "Access-Control-Allow-Origin": '*',
        Authorization: `Bearer ${Cookies.get("token")}`,
        // mode: 'no-cors',
    },
});

// http.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         // if(!error.response && error.code === "ERR_NETWORK") {
//         //     window.location.href = "/dashboard/accessDenied"
//         // } else if(!error.response && error.request) {
//         //     Cookies.remove("token");
//         //     window.location.reload();

//         // } 

//         if (!error.response && error.request) {
//             Cookies.remove("token");
//             window.location.reload();
//         }

//         if (error.respons && !originalRequest._retry) {
//             originalRequest._retry = true;
//             Cookies.remove("token");
//             window.location.reload();
//         }

//         return Promise.reject(error);
//     }
// );
