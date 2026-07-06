const runService = require('../services/runService');

const createRun = async (req, res, next) => {
  try {
    const { ticker } = req.body;
    const run = await runService.createRun(ticker);
    res.status(201).json({ runId: run._id, status: run.status });
  } catch (error) {
    next(error);
  }
};

const getRunStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const run = await runService.getRunStatus(id);
    if (!run) return res.status(404).json({ error: 'Run ID not found.' });
    
    res.status(200).json({
      runId: run._id,
      status: run.status,
      agents: run.agents,
      createdAt: run.createdAt,
      updatedAt: run.updatedAt
    });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ error: 'Invalid Run ID format.' });
    next(error);
  }
};

const getRunReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const run = await runService.getRunReport(id);
    if (!run) return res.status(404).json({ error: 'Run ID not found.' });
    
    if (run.status !== 'completed' && run.status !== 'failed' && run.status !== 'no_recommendation') {
      return res.status(202).json({ status: run.status, message: 'Report is not ready yet.' });
    }
    
    res.status(200).json({
      runId: run._id,
      status: run.status,
      report: run.report
    });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ error: 'Invalid Run ID format.' });
    next(error);
  }
};

module.exports = { createRun, getRunStatus, getRunReport };
