import axios from "axios";


const api = axios.create({
    baseURL: "https://instagram-feed-backend.herokuapp.com",
});

export default api;