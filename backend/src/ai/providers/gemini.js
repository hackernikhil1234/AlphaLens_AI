const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const getGeminiModel = (temperature = 0) => {
  return new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    maxOutputTokens: 2048,
    temperature,
    apiKey: process.env.GEMINI_API_KEY
  });
};

module.exports = { getGeminiModel };
