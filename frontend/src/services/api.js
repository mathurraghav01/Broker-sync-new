import axios from "axios";

const API = axios.create({
    baseURL :  "http://localhost:5000/api"
});

export const connectBroker = () => API.get("/broker/connect");
export const getProfile = () => API.get("/broker/profile");