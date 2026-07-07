const { getGeminiModel } = require('../providers/gemini');
const { getResearchPrompt } = require('../prompts/agentPrompts');
const { researchSchema } = require('../schemas/agentSchemas');
const { updateAgentStatus } = require('../utils/statusUpdater');

const researchAgent = async (state) => {
  console.log("========== RESEARCH AGENT STATE ==========");
  console.log(JSON.stringify(state, null, 2));
  try {
    await updateAgentStatus(state.runId, 'Research Agent', 'running');
    const llm = getGeminiModel(0).withStructuredOutput(researchSchema);
    const result = await llm.invoke(getResearchPrompt(state));
    await updateAgentStatus(state.runId, 'Research Agent', 'completed');
    return { researchSummary: result };
  } catch (error) {
    await updateAgentStatus(state.runId, 'Research Agent', 'failed');
    return { errors: ['Research Agent Failed: ' + error.message] };
  }
};

module.exports = { researchAgent };
