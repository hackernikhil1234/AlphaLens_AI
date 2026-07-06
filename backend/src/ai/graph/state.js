const { Annotation } = require('@langchain/langgraph');

const StateAnnotation = Annotation.Root({
  runId: Annotation(),
  ticker: Annotation(),
  company: Annotation(), 
  marketData: Annotation(), 
  news: Annotation(), 
  researchSummary: Annotation(),
  financialAnalysis: Annotation(), 
  newsAnalysis: Annotation(),
  riskAnalysis: Annotation(), 
  recommendation: Annotation(), 
  confidence: Annotation(),
  reasoning: Annotation(),
  sections: Annotation(), 
  citations: Annotation({
    reducer: (curr, update) => [...new Set([...(curr || []), ...(update || [])])]
  }),
  errors: Annotation({
    reducer: (curr, update) => [...(curr || []), ...(update || [])]
  })
});

module.exports = { StateAnnotation };
