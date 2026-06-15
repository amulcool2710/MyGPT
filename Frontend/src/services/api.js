const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const chatWithGPT = async (prompt, threadId) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: prompt, threadId })
    });
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    
    return await response.json();
};

export const fetchAllThreads = async () => {
    const response = await fetch(`${API_BASE_URL}/thread`);
    if (!response.ok) {
        throw new Error("Failed to fetch threads");
    }
    return await response.json();
};

export const fetchThreadChats = async (threadId) => {
    const response = await fetch(`${API_BASE_URL}/thread/${threadId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch thread chats");
    }
    return await response.json();
};

export const deleteThreadById = async (threadId) => {
    const response = await fetch(`${API_BASE_URL}/thread/${threadId}`, { method: "DELETE" });
    if (!response.ok) {
        throw new Error("Failed to delete thread");
    }
    return await response.json();
};
