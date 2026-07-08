const { getGeminiModel } = require('../providers/gemini');
const { getFinancialPrompt } = require('../prompts/agentPrompts');
const { financialSchema } = require('../schemas/agentSchemas');
const { updateAgentStatus } = require('../utils/statusUpdater');

const financialAgent = async (state) => {
  try {
    await updateAgentStatus(state.runId, 'Financial Agent', 'running');
    const llm = getGeminiModel(0).withStructuredOutput(financialSchema);
    const result = await llm.invoke(getFinancialPrompt(state));
    await updateAgentStatus(state.runId, 'Financial Agent', 'completed');
    return { financialAnalysis: result };
  } catch (error) {
    await updateAgentStatus(state.runId, 'Financial Agent', 'failed');
    return { errors: ['Financial Agent Failed: ' + error.message] };
  }
};

module.exports = { financialAgent };
