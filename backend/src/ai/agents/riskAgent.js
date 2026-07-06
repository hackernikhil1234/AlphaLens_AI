const { getGeminiModel } = require('../providers/gemini');
const { getRiskPrompt } = require('../prompts/agentPrompts');
const { riskSchema } = require('../schemas/agentSchemas');
const { updateAgentStatus } = require('../utils/statusUpdater');

const riskAgent = async (state) => {
  try {
    await updateAgentStatus(state.runId, 'Risk Agent', 'running');
    const llm = getGeminiModel(0.2).withStructuredOutput(riskSchema);
    const result = await llm.invoke(getRiskPrompt(state));
    await updateAgentStatus(state.runId, 'Risk Agent', 'completed');
    return { riskAnalysis: result };
  } catch (error) {
    await updateAgentStatus(state.runId, 'Risk Agent', 'failed');
    return { errors: ['Risk Agent Failed: ' + error.message] };
  }
};

module.exports = { riskAgent };
