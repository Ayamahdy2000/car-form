import axios from "axios";
import {
    authInterceptor,
    errorInterceptor,
    responseInterceptor
} from "./interceptors";
const http = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});
http.interceptors.request.use(authInterceptor);
http.interceptors.response.use(responseInterceptor, errorInterceptor);
export default http;