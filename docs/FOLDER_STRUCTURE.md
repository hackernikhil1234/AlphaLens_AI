# AlphaLens AI: Folder Structure & Conventions

This document outlines a clean, production-inspired folder structure tailored specifically for a 7-day internship project. The structure separates the frontend and backend entirely to ensure ease of deployment and modularity.

---

## 1. Root Directory Structure

The root directory acts as a monorepo container holding both the frontend and backend applications, along with project-wide documentation.

```text
alphalens-ai/
├── backend/                  # Node.js + Express backend & LangGraph orchestration
├── frontend/                 # React.js + Tailwind frontend
├── docs/                     # Project documentation (Vision, Architecture, etc.)
├── .gitignore                # Global git ignores
└── README.md                 # Primary project setup instructions
```

---

## 2. Frontend Structure

Located inside `/frontend/src/`. This follows a standard React/Vite layout, prioritizing component reusability.

```text
frontend/src/
├── assets/         # Static files (images, icons, global CSS)
├── components/     # Reusable UI components (buttons, inputs, cards)
├── context/        # Global React Context providers (e.g., ThemeContext)
├── hooks/          # Custom React hooks (e.g., useAnalysisStream)
├── layouts/        # Page wrappers (e.g., MainLayout with Navbar/Footer)
├── pages/          # High-level route components (Home, Analysis, Report)
├── services/       # API call logic (fetch requests to the Express backend)
├── utils/          # Helper functions (date formatting, currency formatting)
├── App.jsx         # Root component routing
└── main.jsx        # React DOM entry point
```

### Folder Purposes:
*   **`pages/`**: Contains the exact three screens defined in the UX (Home, Analysis, Report).
*   **`components/`**: Holds "dumb" components that just receive props and render UI (e.g., `Button.jsx`, `TerminalFeed.jsx`).
*   **`layouts/`**: Ensures consistent margins, padding, and headers across different pages.
*   **`hooks/`**: Encapsulates complex React logic (like handling the Server-Sent Events stream) out of the UI components.
*   **`services/`**: Keeps `fetch` and `axios` calls out of components to make testing and refactoring easier.
*   **`context/`**: Manages global state if necessary (though state should ideally be kept local for a 1-week project).
*   **`assets/`**: Where `index.css` lives, containing the Tailwind directives.
*   **`utils/`**: Small, pure JavaScript functions that don't depend on React.

---

## 3. Backend Structure

Located inside `/backend/src/`. This follows an MVC-like Express structure but with a heavy emphasis on isolating the AI logic.

```text
backend/src/
├── ai/             # Core LangGraph orchestration and logic
│   ├── agents/     # Individual agent definitions (Data, News, Risk, etc.)
│   ├── graph/      # The state machine and node routing logic
│   ├── prompts/    # Static system prompts and LLM instructions
│   ├── providers/  # LLM API wrappers (Gemini setup)
│   └── schemas/    # Zod/TypeScript schemas defining agent inputs/outputs
├── config/         # Environment variables and DB connection setup
├── controllers/    # Express route logic (handling req/res)
├── middleware/     # Express middleware (error handling, rate limiting)
├── models/         # MongoDB Mongoose schemas (e.g., Report.js)
├── routes/         # Express endpoint definitions (e.g., /api/analyze)
├── services/       # External API integrations (Yahoo Finance, NewsAPI)
├── utils/          # Helper functions
└── server.js       # Express server entry point
```

### Folder Purposes:
*   **`routes/`**: Maps URLs (like `POST /analyze`) to specific controller functions.
*   **`controllers/`**: Handles HTTP requests, extracts parameters, calls services, and sends HTTP responses.
*   **`services/`**: Holds the business logic for fetching external data (like calling Yahoo Finance).
*   **`middleware/`**: Functions that run before controllers (e.g., checking for valid JSON).
*   **`models/`**: Defines how the data looks in MongoDB.
*   **`config/`**: Centralizes `dotenv` loading and database connection strings.
*   **`utils/`**: Shared helper functions (like error loggers).
*   **`ai/` (The Core Engine):**
    *   **`agents/`**: Code defining what each specific agent does.
    *   **`graph/`**: The LangGraph state definition and workflow edges.
    *   **`prompts/`**: Extracts long strings of instructions out of the logic files.
    *   **`schemas/`**: Enforces strict JSON output formatting for the LLM.
    *   **`providers/`**: The initialization code for the `@langchain/google-genai` model.

---

## 4. Naming Conventions

To maintain a professional, readable codebase, the following conventions are strictly enforced:

*   **Files (General):** `kebab-case` for backend files (`user-routes.js`, `yahoo-finance.js`).
*   **Folders:** `kebab-case` or `camelCase` (e.g., `components`, `api-routes`). All lowercase.
*   **React Components:** `PascalCase` for both filenames and the functions within them (e.g., `TerminalFeed.jsx`, `const TerminalFeed = () => {}`).
*   **APIs (Endpoints):** Nouns, plural, `kebab-case` (e.g., `POST /api/reports/analyze`).
*   **Functions:** `camelCase` with descriptive action verbs (e.g., `fetchStockData()`, `handleFormSubmit()`, `formatCurrency()`).
*   **Mongo Models:** `PascalCase` and singular for the filename and model (e.g., `Report.js`, `const Report = mongoose.model('Report', reportSchema)`).

---

## 5. Import Strategy

To keep files clean and readable, group imports at the top of every file in the following specific order, separated by a blank line:

1.  **Node Modules / React core:** (e.g., `import React, { useState } from 'react';`)
2.  **Third-party Libraries:** (e.g., `import axios from 'axios';`, `import { StateGraph } from '@langchain/langgraph';`)
3.  **Local Contexts / Hooks:** (e.g., `import useAnalysisStream from '../hooks/useAnalysisStream';`)
4.  **Local Components:** (e.g., `import TerminalFeed from '../components/TerminalFeed';`)
5.  **Local Utils / Services:** (e.g., `import { formatCurrency } from '../utils/formatters';`)
6.  **Styles / Assets:** (e.g., `import '../assets/index.css';`)

---

## 6. Future Expansion

While the scope is restricted for this 7-day project, the folder structure is designed to accept new features gracefully:
*   **Adding Authentication:** Would go in `backend/src/middleware/auth.js` and `frontend/src/context/AuthContext.jsx`.
*   **Adding SEC Filings Agent:** Would simply require adding `sec-agent.js` to `backend/src/ai/agents/` and updating the graph logic in `backend/src/ai/graph/`, without touching any UI code.
*   **Adding Portfolio Tracking:** Would require a new `User.js` and `Portfolio.js` in `backend/src/models/`, and a new `frontend/src/pages/Dashboard.jsx`.
