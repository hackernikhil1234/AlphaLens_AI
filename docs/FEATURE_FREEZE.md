# AlphaLens AI: Feature Freeze & Scope Definition

## 1. Project Overview & Constraints
*   **Timeline:** 7 Days
*   **Tech Stack:** Next.js (Frontend), Node.js (Backend execution), `@langchain/langgraph` (Multi-Agent framework in JS/TS), MongoDB (Database).
*   **Data Sources / APIs:** Free tiers (e.g., `yahoo-finance2` for market data, NewsAPI for news, OpenAI/Anthropic/Gemini for LLM).
*   **Primary Goal:** Demonstrate a working, reliable multi-agent architecture generating an explainable investment thesis for a single stock.

---

## 2. Version 1: Core MVP (Must-Have for Day 7)
*These features are strictly necessary to prove the core concept in an interview setting. They highlight your engineering and AI product skills.*

### Frontend (Next.js)
*   **Search Interface:** A polished landing page with a search bar accepting a stock ticker (e.g., AAPL).
*   **Real-time "Agent Chatter" UI:** A live feed component displaying the current state of the LangGraph workflow (e.g., "Data Agent is fetching financials...", "Risk Agent is formulating the Bear case...").
*   **Structured Report View:** A clean UI to display the final markdown report organized into strict sections: Company Overview, Bull Case, Bear Case, Key Risks, and Final Verdict.

### Backend & AI (Node.js + LangGraph)
*   **Multi-Agent Workflow:** A functioning LangGraph state graph utilizing the following agents:
    *   **Data Agent:** Uses `yahoo-finance2` to deterministically fetch current price, 52-week high/low, P/E ratio, and Market Cap.
    *   **News Agent:** Fetches 3-5 recent news headlines for current sentiment context.
    *   **Analyst Agent:** Synthesizes the quantitative data and news into a Bull Case and baseline thesis.
    *   **Risk (Devil's Advocate) Agent:** Critiques the Analyst's thesis to identify vulnerabilities and writes the Bear Case.
    *   **Chairperson Agent:** Evaluates all inputs and issues a final, balanced "Buy/Hold/Sell" recommendation.
*   **Streaming API Endpoint:** An API route that triggers the LangGraph workflow and streams progress updates back to the frontend (using Server-Sent Events or WebSockets) to populate the Agent Chatter UI.

### Database (MongoDB)
*   **Report Caching:** Save completed reports in MongoDB (keyed by ticker symbol and timestamp). If a user searches a ticker analyzed within the last 24 hours, serve the cached report immediately to save LLM costs and execution time. Include a "Force Refresh" button for live data.

---

## 3. Stretch Goals (Optional - Only if time permits)
*Features to implement on Day 6 or 7 only if the MVP is 100% complete, stable, and styled.*

*   **Historical Price Chart:** Add a simple, interactive line chart on the frontend (using Recharts or Chart.js) showing the last 6 months of price action to complement the report.
*   **Token Streaming:** Stream the final report text chunk-by-chunk to the UI for a ChatGPT-like responsive experience.
*   **Source Citations:** Hyperlink specific data points or news claims in the final report directly to their original URLs.

---

## 4. Out of Scope (Intentionally Postponed)
*Features explicitly excluded to prevent scope creep, reduce complexity, and ensure completion within the 7-day internship constraint.*

*   **User Authentication (Auth.js/NextAuth):** The application will be publicly accessible without requiring users to log in or manage accounts.
*   **Portfolio Management & Watchlists:** Managing multiple stocks or tracking user portfolios is unnecessary for proving the multi-agent concept.
*   **SEC Filings Parsing (10-K/10-Q):** Extracting contextual data from long, unstructured SEC PDFs or XBRL is notoriously difficult, error-prone, and will derail the 7-day timeline.
*   **Automated Trading Execution:** Integrating with brokerage APIs (like Alpaca or Interactive Brokers) for live trading.
*   **Advanced Quantitative Models:** No Discounted Cash Flow (DCF) models, algorithmic backtesting, or complex valuation formulas. The focus is on qualitative synthesis of basic quantitative data.
