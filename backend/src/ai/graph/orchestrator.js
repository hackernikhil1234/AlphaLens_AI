const { StateGraph, END, START } = require('@langchain/langgraph');
const { StateAnnotation } = require('./state');
const { researchAgent } = require('../agents/researchAgent');
const { financialAgent } = require('../agents/financialAgent');
const { newsAgent } = require('../agents/newsAgent');
const { riskAgent } = require('../agents/riskAgent');
const { chairpersonAgent } = require('../agents/chairpersonAgent');
const Run = require('../../models/Run');

// Conditional Edge
const routeAfterFinancial = (state) => {
  if (state.financialAnalysis?.isDataSufficient === false) {
    return "Chairperson"; // Skips straight to end to abort
  }
  return "News";
};

const buildGraph = () => {
  const workflow = new StateGraph(StateAnnotation)
    .addNode("Research", researchAgent)
    .addNode("Financial", financialAgent)
    .addNode("News", newsAgent)
    .addNode("Risk", riskAgent)
    .addNode("Chairperson", chairpersonAgent)

    .addEdge(START, "Research")
    .addEdge("Research", "Financial")
    .addConditionalEdges("Financial", routeAfterFinancial, {
      "News": "News",
      "Chairperson": "Chairperson" 
    })
    .addEdge("News", "Risk")
    .addEdge("Risk", "Chairperson")
    .addEdge("Chairperson", END);

  return workflow.compile();
};

const executeRun = async (runId, initialState) => {
  try {
    await Run.findByIdAndUpdate(runId, { status: 'processing' });
    
    const graph = buildGraph();
    const finalState = await graph.invoke({ ...initialState, runId });
    
    // Persist final report
    await Run.findByIdAndUpdate(runId, {
      status: finalState.recommendation === 'No Recommendation' ? 'no_recommendation' : 'completed',
      report: {
        recommendation: finalState.recommendation || 'No Recommendation',
        confidence: finalState.confidence || 0,
        reasoning: finalState.reasoning || 'Workflow failed to generate sufficient reasoning.',
        sections: finalState.sections || {},
        citations: finalState.citations || []
      },
      $push: { debugLogs: { $each: finalState.errors || [] } }
    });
  } catch (error) {
    console.error(`Run ${runId} failed:`, error);
    await Run.findByIdAndUpdate(runId, { 
      status: 'failed',
      $push: { debugLogs: `Fatal graph error: ${error.message}` }
    });
  }
};

module.exports = { executeRun };
