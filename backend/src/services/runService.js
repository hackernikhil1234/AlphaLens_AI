const Run = require('../models/Run');

const createRun = async (ticker) => {
  const run = new Run({
    ticker,
    status: 'pending',
    agents: [
      { name: 'Research Agent', status: 'pending' },
      { name: 'Financial Agent', status: 'pending' },
      { name: 'News Agent', status: 'pending' },
      { name: 'Risk Agent', status: 'pending' },
      { name: 'Chairperson Agent', status: 'pending' }
    ]
  });
  await run.save();
  return run;
};

const getRunStatus = async (id) => {
  const run = await Run.findById(id).select('status agents createdAt updatedAt');
  return run;
};

const getRunReport = async (id) => {
  const run = await Run.findById(id).select('status report');
  return run;
};

module.exports = { createRun, getRunStatus, getRunReport };
