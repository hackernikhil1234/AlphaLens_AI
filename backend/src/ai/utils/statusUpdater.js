const Run = require('../../models/Run');

const updateAgentStatus = async (runId, agentName, status) => {
  if (!runId) return;
  try {
    await Run.findOneAndUpdate(
      { _id: runId, 'agents.name': agentName },
      { $set: { 'agents.$.status': status } }
    );
  } catch (error) {
    console.error(`Failed to update status for ${agentName}:`, error.message);
  }
};

module.exports = { updateAgentStatus };
