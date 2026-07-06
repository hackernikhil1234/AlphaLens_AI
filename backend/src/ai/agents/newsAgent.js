const { getGeminiModel } = require('../providers/gemini');
const { getNewsPrompt } = require('../prompts/agentPrompts');
const { newsSchema } = require('../schemas/agentSchemas');
const { updateAgentStatus } = require('../utils/statusUpdater');

const newsAgent = async (state) => {
  try {
    await updateAgentStatus(state.runId, 'News Agent', 'running');
    const llm = getGeminiModel(0.2).withStructuredOutput(newsSchema);
    const result = await llm.invoke(getNewsPrompt(state));
    await updateAgentStatus(state.runId, 'News Agent', 'completed');
    return { newsAnalysis: result };
  } catch (error) {
    await updateAgentStatus(state.runId, 'News Agent', 'failed');
    return { errors: ['News Agent Failed: ' + error.message] };
  }
};

module.exports = { newsAgent };
