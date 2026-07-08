require('dotenv').config();
const { researchAgent } = require('./src/ai/agents/researchAgent');

async function test() {
  console.log("Testing Research Agent...");
  const state = {
    company: "Apple Inc.",
    ticker: "AAPL",
    runId: "test_run_123"
  };
  const result = await researchAgent(state);
  console.log("Result:", result);
}

test();
