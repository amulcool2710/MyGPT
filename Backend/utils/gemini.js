import "dotenv/config";

const getGeminiAPIResponse = async (message) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("Gemini API Error: GEMINI_API_KEY is not set in environment variables.");
        return "❌ Error: API Key missing. Please configure GEMINI_API_KEY.";
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: message }]
            }]
        })
    };

    try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        
        if (!response.ok) {
            console.error("Gemini API Error:", data.error?.message || data);
            return "❌ Error: Gemini API Key invalid or quota exceeded. Please check your key.";
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch(err) {
        console.error("Fetch Error:", err);
        return "❌ Error: Could not reach Gemini server.";
    }
}

export default getGeminiAPIResponse;
