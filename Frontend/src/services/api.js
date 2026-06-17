let IS_PROD = true;
const API_BASE_URL = IS_PROD ? 
    "https://mygpt-backend.onrender.com/api" : 
    "http://localhost:8080/api";

const getAuthHeaders = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`
        };
    }
    return { "Content-Type": "application/json" };
};

export const loginAPI = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
    return data;
};

export const registerAPI = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");
    return data;
};

export const chatWithGPT = async (prompt, threadId) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: prompt, threadId })
    });
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    
    return await response.json();
};

export const fetchAllThreads = async () => {
    const response = await fetch(`${API_BASE_URL}/thread`, { headers: getAuthHeaders() });
    if (!response.ok) {
        throw new Error("Failed to fetch threads");
    }
    return await response.json();
};

export const fetchThreadChats = async (threadId) => {
    const response = await fetch(`${API_BASE_URL}/thread/${threadId}`, { headers: getAuthHeaders() });
    if (!response.ok) {
        throw new Error("Failed to fetch thread chats");
    }
    return await response.json();
};

export const deleteThreadById = async (threadId) => {
    const response = await fetch(`${API_BASE_URL}/thread/${threadId}`, { method: "DELETE", headers: getAuthHeaders() });
    if (!response.ok) {
        throw new Error("Failed to delete thread");
    }
    return await response.json();
};
