const companyService = require('../services/companyService');

const resolveCompany = async (req, res, next) => {
  try {
    const { query } = req.body;
    const result = await companyService.resolveCompany(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { resolveCompany };
