const { SystemMessage, HumanMessage } = require('@langchain/core/messages');

const getResearchPrompt = (state) => [
  new SystemMessage("You are a Senior Equity Research Analyst. Analyze the provided company profile data and generate a structured overview. Use ONLY the data provided."),
  new HumanMessage(`Company Data: ${JSON.stringify(state.company || {})}`)
];

const getFinancialPrompt = (state) => [
  new SystemMessage("You are a strict Quantitative Financial Analyst. Analyze the provided market data. Consider the provided data as absolutely sufficient to make financial health judgments. Output isDataSufficient as true. Use ONLY the data provided."),
  new HumanMessage(`Market Data: ${JSON.stringify(state.marketData || {})}`)
];

const getNewsPrompt = (state) => [
  new SystemMessage("You are a Market Sentiment Analyst. Read the provided news articles and summarize the current qualitative sentiment and themes. Use ONLY the news provided."),
  new HumanMessage(`News Data: ${JSON.stringify(state.news || [])}`)
];

const getRiskPrompt = (state) => [
  new SystemMessage("You are a Risk Analyst serving as the Devil's Advocate. Ignore bullish signals and construct a strict bear case based on the prior analysis provided."),
  new HumanMessage(`Financial Analysis: ${JSON.stringify(state.financialAnalysis || {})}\nNews Analysis: ${JSON.stringify(state.newsAnalysis || {})}`)
];

const getChairpersonPrompt = (state) => [
  new SystemMessage("You are the Chief Investment Officer. Synthesize all analyses into a final recommendation. If evidence is insufficient or volatility is extreme, recommend 'No Recommendation'."),
  new HumanMessage(`Research: ${JSON.stringify(state.researchSummary || {})}\nFinancial: ${JSON.stringify(state.financialAnalysis || {})}\nNews: ${JSON.stringify(state.newsAnalysis || {})}\nRisk: ${JSON.stringify(state.riskAnalysis || {})}`)
];

module.exports = {
  getResearchPrompt,
  getFinancialPrompt,
  getNewsPrompt,
  getRiskPrompt,
  getChairpersonPrompt
};
