# AlphaLens AI: Product Vision

## 1. Project Name
AlphaLens AI

## 2. One-line Tagline
Automated, evidence-based equity research powered by multi-agent AI.

## 3. Product Vision
To build an intelligent research assistant that accelerates the initial phase of equity research. By synthesizing real-time market data and news into a concise, explainable investment thesis, AlphaLens AI helps users make informed financial decisions without spending hours manually sifting through disparate data sources.

## 4. Problem Statement
Retail investors and junior analysts face a massive data-processing bottleneck. Forming a baseline investment thesis requires tracking down current stock metrics, reading recent news, and interpreting basic financials. This process is manual, time-consuming, and prone to cognitive bias. Existing chatbots often hallucinate financial data or fail to provide a structured, easily digestible report based on real-time facts.

## 5. Target Users
- **Retail Investors:** Looking for a quick, unbiased summary of a stock before making a trade.
- **Junior Financial Analysts / Interns:** Needing a starting point or a "second opinion" for their equity research reports.
- **Finance Students:** Seeking to understand market sentiment and basic financial health of companies.

## 6. Value Proposition
AlphaLens AI reduces the time required to generate a baseline equity research report from hours to minutes. It provides a structured, objective, and data-backed recommendation (Buy/Hold/Sell) with clear reasoning, allowing users to focus on higher-level decision-making rather than data gathering.

## 7. Why Multi-Agent AI instead of one chatbot?
A single Large Language Model (LLM) trying to fetch data, analyze sentiment, and write a cohesive financial report often gets confused, loses context, or hallucinates numbers. 

By using a multi-agent architecture (via LangGraph), we enforce **separation of concerns**:
- **Data Agent:** Focuses strictly on retrieving accurate API data (price, volume, P/E ratio).
- **News Agent:** Focuses strictly on summarizing recent market news and sentiment.
- **Analyst Agent:** Takes the structured outputs from the previous agents to formulate a logical conclusion.

This modularity prevents hallucinations, makes the system easier to debug, and allows us to easily add new capabilities (like an SEC Filings Agent) in the future without rewriting the core logic.

## 8. Version 1 (MVP) Scope (7-Day Constraint)
Given the 7-day timeline, V1 will focus strictly on a robust, end-to-end pipeline for a single equity rather than a complex web application.
- **Input:** User provides a single stock ticker (e.g., AAPL).
- **Data Sources:** Integration with a free, accessible API like `yfinance` (Yahoo Finance) for basic stock metrics and top 3-5 recent news headlines.
- **Multi-Agent Workflow (LangGraph):**
  1. **Researcher Node:** Fetches current price, 52-week high/low, and basic valuation metrics.
  2. **News Node:** Fetches and summarizes the most recent news articles for the ticker.
  3. **Synthesizer Node:** Evaluates the gathered data to generate a short, structured report (Company Overview, Bull Case, Bear Case, Final Recommendation).
- **User Interface:** A simple, clean Streamlit or Gradio web app.

## 9. Future Scope (Intentionally Postponed)
*These features are out of scope for the internship project but represent the roadmap for an enterprise version.*
- **SEC Filings Integration:** Parsing 10-K and 10-Q documents for deep fundamental analysis.
- **Alternative Data Sentiment:** Scraping Twitter/X or Reddit (r/wallstreetbets) for retail sentiment.
- **Portfolio Optimization:** Analyzing multiple stocks simultaneously to suggest portfolio weighting.
- **Complex UI:** User authentication, saving report history, and generating PDF exports.
- **Quantitative Modeling:** Running automated Discounted Cash Flow (DCF) valuations.

## 10. Design Principles
- **Explainability:** The final recommendation must explicitly reference the data points or news articles it used. "Show your work."
- **Evidence-Based Reasoning:** No blind LLM guesses. If the data retrieval step fails, the system must gracefully fail and inform the user, rather than making up a financial metric.
- **Modular Architecture:** The LangGraph implementation must be clean and componentized. Adding a new data source should only require adding a new node, not rewriting the graph logic.

## 11. Success Criteria
- **Functional:** The system successfully generates a coherent, structured report for a valid S&P 500 ticker within 60-90 seconds.
- **Architectural:** The code explicitly utilizes a state graph (LangGraph) with at least two distinct agent nodes passing state.
- **Reliability:** The app handles invalid tickers gracefully (e.g., inputting "INVALID_TICKER" returns a clean error message, not a stack trace).
- **Presentation:** The final code is well-documented, includes a clear `README.md` with setup instructions, and is easily deployable locally for the interview demonstration.
