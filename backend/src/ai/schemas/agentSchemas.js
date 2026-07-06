const { z } = require('zod');

const researchSchema = z.object({
  companySummary: z.string().describe("A brief summary of the company."),
  businessModel: z.string().describe("How the company makes money."),
  sector: z.string().describe("The broader market sector."),
  industry: z.string().describe("The specific industry.")
});

const financialSchema = z.object({
  financialHealth: z.string().describe("Assessment of the financial stability."),
  valuation: z.string().describe("Assessment of the company valuation."),
  growthProspects: z.string().describe("Future growth expectations."),
  isDataSufficient: z.boolean().describe("False if essential data is missing to make a judgement.")
});

const newsSchema = z.object({
  sentiment: z.string().describe("Overall market sentiment based on news."),
  keyThemes: z.array(z.string()).describe("List of themes emerging from the news."),
  marketPerception: z.string().describe("How the market currently perceives the company.")
});

const riskSchema = z.object({
  bearCase: z.string().describe("The absolute worst-case scenario for the stock."),
  headwinds: z.array(z.string()).describe("List of risks and headwinds."),
  volatilityRisk: z.string().describe("Assessment of risk volatility.")
});

const chairpersonSchema = z.object({
  recommendation: z.enum(['BUY', 'HOLD', 'SELL', 'No Recommendation']),
  confidence: z.number().min(0).max(100),
  reasoning: z.string().describe("A high level explanation of why this verdict was reached."),
  sections: z.object({
    companySummary: z.string(),
    financialAnalysis: z.string(),
    bullCase: z.string(),
    bearCase: z.string()
  }),
  citations: z.array(z.string())
});

module.exports = {
  researchSchema,
  financialSchema,
  newsSchema,
  riskSchema,
  chairpersonSchema
};
