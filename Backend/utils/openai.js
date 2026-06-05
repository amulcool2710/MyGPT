import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        
        if (!response.ok) {
            console.error("OpenAI API Error:", data.error?.message);
            return "❌ Error: OpenAI API Key invalid or quota exceeded. Please check your key.";
        }
        
        return data.choices[0].message.content; //reply
    } catch(err) {
        console.error("Fetch Error:", err);
        return "❌ Error: Could not reach OpenAI server.";
    }
}

export default getOpenAIAPIResponse;