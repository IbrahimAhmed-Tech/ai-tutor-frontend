import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const loginUser = (email, password) => {
    return API.post("/api/auth/login", { email, password });
};

export const registerUser = (name, context, email, password) => {
    return API.post("/api/auth/signup", {
        name,
        context,
        email,
        password,
    });
};
