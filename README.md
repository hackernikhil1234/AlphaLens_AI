# AlphaLens AI

Automated, evidence-based equity research powered by multi-agent AI.

## Project Status
**MVP Completed – Fully Working – Internship Submission Version**

## Project Overview
AlphaLens AI is an intelligent investment research assistant that leverages a multi-agent AI system (LangGraph + Google Gemini) to autonomously research, analyze, and synthesize financial data and news into professional equity research reports.

### Problem Statement
Traditional equity research is manual, time-consuming, and prone to human bias. Retail investors and junior analysts often struggle to synthesize complex market data, qualitative news sentiment, and strict quantitative metrics into a cohesive, actionable recommendation quickly.

### Solution
AlphaLens AI solves this by orchestrating specialized AI agents—Research, Financial, News, Risk, and a Chairperson—that act as an automated research department. The system fetches real-time market data and news, evaluates the evidence strictly, and produces a final, unbiased investment recommendation (Buy/Hold/Sell) with a calibrated confidence score.

## Features
- **Company Resolution:** Resolves company names or tickers (e.g. "Apple" → AAPL) using Yahoo Finance search.
- **Autonomous Data Collection:** Real-time data fetching via Yahoo Finance, NewsAPI, and Tavily.
- **Multi-Agent Orchestration:** Specialized LangGraph agents evaluate distinct aspects of a company.
- **Professional Reporting:** Synthesized executive summaries, bull/bear cases, and calibrated confidence scores.
- **Real-Time Polling UI:** Dynamic frontend progress tracking as agents execute in the background.

## System Architecture
AlphaLens AI uses a non-blocking asynchronous REST API architecture:
1. **Frontend:** Submits analysis requests and polls the backend for agent status.
2. **Backend Controllers:** Triggers background LangGraph execution and persists state.
3. **Data Collection Layer:** Aggregates and normalizes external APIs before LangGraph starts.
4. **LangGraph Pipeline:** Sequential state graph orchestration of Gemini-powered agents.
5. **Database:** MongoDB for persistent storage of runs and final reports.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Framer Motion, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **AI Orchestration:** LangChain, LangGraph, Google Gemini 2.5 Flash
- **External Data:** Yahoo Finance v3, NewsAPI, Tavily

## Folder Structure
```
alphalens-ai/
├── backend/
│   ├── src/
│   │   ├── ai/          # LangGraph agents, prompts, schemas, state, providers
│   │   ├── config/      # Database connection
│   │   ├── controllers/ # Express route controllers
│   │   ├── middleware/  # Zod validation middleware
│   │   ├── models/      # Mongoose schemas (Run)
│   │   ├── routes/      # API route definitions
│   │   ├── schemas/     # Zod request validation schemas
│   │   ├── services/    # Company resolve, data collection, run service
│   │   └── utils/       # Shared utilities
│   └── server.js        # Express application entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (AgentCard)
│   │   ├── pages/       # Route-level components (Home, Analysis, Report)
│   │   └── services/    # Axios API client
├── docs/                # Architecture and design documentation
└── README.md
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hackernikhil1234/AlphaLens_AI.git
   cd AlphaLens_AI
   ```
2. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend && npm install
   ```

## Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alphalens
GEMINI_API_KEY=your_gemini_api_key_here
NEWS_API_KEY=your_newsapi_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

> **Gemini API Key:** Get a free key from [Google AI Studio](https://aistudio.google.com/apikey). The project uses `gemini-2.5-flash`.
>
> **NewsAPI Key:** Register at [newsapi.org](https://newsapi.org).
>
> **Tavily API Key:** Register at [tavily.com](https://tavily.com). Used as a fallback if NewsAPI returns no results.

## Running Locally
Ensure MongoDB is running locally on port 27017.

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:5173` to use the application.

## User Flow
1. Enter a company name (e.g. `Apple`, `Tesla`) or ticker (e.g. `AAPL`) on the home page
2. The system resolves it to the correct ticker via Yahoo Finance
3. Data is collected in parallel from Yahoo Finance, NewsAPI, and Tavily
4. The LangGraph pipeline fires — watch each agent complete in real-time
5. The Chairperson Agent synthesizes a final Buy/Hold/Sell recommendation
6. The full structured report is displayed with confidence score and detailed sections

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | System health check |
| `POST` | `/api/companies/resolve` | Resolves company name → ticker symbol |
| `POST` | `/api/runs` | Triggers a new background analysis run |
| `GET` | `/api/runs/:id/status` | Real-time agent status polling |
| `GET` | `/api/runs/:id/report` | Final structured report |

## LangGraph Agent Pipeline
```
Data Collection (Express)
        ↓
  Research Agent  →  Gemini 2.5-flash  →  researchSummary
        ↓
  Financial Agent →  Gemini 2.5-flash  →  financialAnalysis
        ↓
  News Agent      →  Gemini 2.5-flash  →  newsAnalysis
        ↓
  Risk Agent      →  Gemini 2.5-flash  →  riskAnalysis
        ↓
  Chairperson     →  Gemini 2.5-flash  →  BUY / HOLD / SELL + Report
        ↓
  MongoDB (persisted)
```

## Future Scope
- User Authentication (JWT) and persistent user profiles
- Portfolio tracking and historical analysis dashboards
- PDF Report Export functionality
- Caching layer for external API requests to reduce latency

## Known Limitations
- Rate limits apply on free tiers of Gemini (gemini-2.5-flash), NewsAPI, and Tavily
- Deep historical financial modeling is constrained to current trailing metrics from Yahoo Finance

## License
MIT License
