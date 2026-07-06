const { getGeminiModel } = require('../providers/gemini');
const { getChairpersonPrompt } = require('../prompts/agentPrompts');
const { chairpersonSchema } = require('../schemas/agentSchemas');
const { updateAgentStatus } = require('../utils/statusUpdater');

const chairpersonAgent = async (state) => {
  try {
    await updateAgentStatus(state.runId, 'Chairperson Agent', 'running');
    const llm = getGeminiModel(0.1).withStructuredOutput(chairpersonSchema);
    const result = await llm.invoke(getChairpersonPrompt(state));
    await updateAgentStatus(state.runId, 'Chairperson Agent', 'completed');
    return {
      recommendation: result.recommendation,
      confidence: result.confidence,
      reasoning: result.reasoning,
      sections: result.sections,
      citations: result.citations || ['AI Analysis']
    };
  } catch (error) {
    await updateAgentStatus(state.runId, 'Chairperson Agent', 'failed');
    return { errors: ['Chairperson Agent Failed: ' + error.message] };
  }
};

module.exports = { chairpersonAgent };
