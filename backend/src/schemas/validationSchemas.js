const { z } = require('zod');

const resolveCompanySchema = z.object({
  query: z.string().min(1).max(50)
});

const createRunSchema = z.object({
  ticker: z.string().trim().min(1).max(5).toUpperCase()
});

module.exports = {
  resolveCompanySchema,
  createRunSchema
};
