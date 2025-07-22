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

export const validateToken = (token) => {
    return API.get("/api/auth/validate-token", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

export const transcribeAudio = (audioBlob,userId ,userContext) => {
  
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    formData.append("userId", userId);
    formData.append("userContext", userContext);

    return API.post("/api/ai-conversation", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};