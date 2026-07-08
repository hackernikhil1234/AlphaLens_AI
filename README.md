# AlphaLens AI

Automated, evidence-based equity research powered by multi-agent AI.

## Project Status
**MVP Completed – Internship Submission Version**

## Project Overview
AlphaLens AI is an intelligent investment research assistant that leverages a multi-agent AI system (LangGraph + Google Gemini) to autonomously research, analyze, and synthesize financial data and news into professional equity research reports.

### Problem Statement
Traditional equity research is manual, time-consuming, and prone to human bias. Retail investors and junior analysts often struggle to synthesize complex market data, qualitative news sentiment, and strict quantitative metrics into a cohesive, actionable recommendation quickly.

### Solution
AlphaLens AI solves this by orchestrating specialized AI agents—Research, Financial, News, Risk, and a Chairperson—that act as an automated research department. The system fetches real-time market data and news, evaluates the evidence strictly, and produces a final, unbiased investment recommendation (Buy/Hold/Sell) with a calibrated confidence score.

## Features
- **Company Resolution:** Normalizes ticker and company inputs.
- **Autonomous Data Collection:** Real-time data fetching via Yahoo Finance, NewsAPI, and Tavily.
- **Multi-Agent Orchestration:** Specialized LangGraph agents evaluate distinct aspects of a company.
- **Professional Reporting:** Synthesized executive summaries, bull/bear cases, and calibrated confidence scores.
- **Real-Time Polling UI:** Dynamic frontend progress tracking as agents execute in the background.

## System Architecture
AlphaLens AI uses a non-blocking asynchronous REST API architecture:
1. **Frontend:** Submits analysis requests and polls the backend for agent status.
2. **Backend Controllers:** Triggers background LangGraph execution and persists state.
3. **Data Collection Layer:** Aggregates and normalizes external APIs.
4. **LangGraph Pipeline:** State graph orchestration of Gemini-powered agents.
5. **Database:** MongoDB for persistent storage of runs and final reports.

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **AI Orchestration:** LangChain, LangGraph, Google Gemini 2.5 Flash
- **External Data:** Yahoo Finance v3, NewsAPI, Tavily

## Folder Structure
```
alphalens-ai/
├── backend/
│   ├── src/
│   │   ├── ai/          # LangGraph agents, prompts, schemas, state
│   │   ├── config/      # Database connections
│   │   ├── controllers/ # Express route controllers
│   │   ├── middleware/  # Express middlewares (error handling, validation)
│   │   ├── models/      # Mongoose schemas (Run, etc.)
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Data collection integrations
│   │   └── utils/       # Shared utilities
│   └── server.js        # Express application entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level components (Home, Analysis, Report)
│   │   └── services/    # Axios API client
├── docs/                # Architecture and design documentation
└── README.md            # You are here
```

## Installation
1. Clone the repository: `git clone https://github.com/hackernikhil1234/AlphaLens_AI.git`
2. Install Backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install Frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/alphalens
GEMINI_API_KEY=your_gemini_api_key
NEWS_API_KEY=your_newsapi_key
TAVILY_API_KEY=your_tavily_api_key
```

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

## API Endpoints
- `GET /api/health` - System health check.
- `POST /api/companies/resolve` - Validates and normalizes a ticker symbol.
- `POST /api/runs` - Triggers a new background analysis run.
- `GET /api/runs/:id/status` - Polls the completion status of individual agents.
- `GET /api/runs/:id/report` - Retrieves the final generated report.

## Screenshots
*(Add screenshots of the Home Page, Progress Tracker, and Final Report here)*

## Future Scope
- User Authentication (JWT) and persistent user profiles.
- Portfolio tracking and historical analysis dashboards.
- PDF Report Export functionality.
- Caching layer for external API requests to reduce latency.

## Known Limitations
- Heavy reliance on external API rate limits (particularly free tiers of Gemini and NewsAPI).
- Deep historical financial modeling is constrained to current trailing metrics.

## License
MIT License
