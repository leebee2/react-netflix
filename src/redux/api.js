import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { "Content-type": "application/json" },
});

export default api;
