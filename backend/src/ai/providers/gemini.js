const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const getGeminiModel = (temperature = 0) => {
  console.log("Gemini API Key Loaded:", !!process.env.GEMINI_API_KEY);

  return new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature,
    apiKey: process.env.GEMINI_API_KEY,
  });
};

module.exports = { getGeminiModel };
