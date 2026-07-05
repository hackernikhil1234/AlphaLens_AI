# AlphaLens AI: REST API Design

## 1. API Overview
The AlphaLens AI API is designed with a **minimalist, resource-oriented REST philosophy**. Because the LangGraph AI workflows are long-running (30-60 seconds), the API utilizes an asynchronous polling architecture. The client submits a job, receives a Run ID, and then polls for status updates until the final report is ready. This approach avoids HTTP timeout issues on serverless or cloud platforms and is highly realistic for a 7-day project.

---

## 2. Endpoint List
The MVP strictly limits the API surface to five essential routes:

1.  `GET /api/health` — System health check.
2.  `POST /api/companies/resolve` — Validates a ticker symbol or company name.
3.  `POST /api/runs` — Initiates a new LangGraph analysis run.
4.  `GET /api/runs/:id/status` — Polls the live status of the AI agents.
5.  `GET /api/runs/:id/report` — Retrieves the final generated report.

---

## 3. & 4. Request & Response Formats

### 1. `GET /api/health`
*   **Method:** GET
*   **URL:** `/api/health`
*   **Headers:** None
*   **Body:** None
*   **Success Response (200):**
    ```json
    { "status": "ok", "timestamp": "2026-07-05T12:00:00Z" }
    ```

### 2. `POST /api/companies/resolve`
*   **Method:** POST
*   **URL:** `/api/companies/resolve`
*   **Headers:** `Content-Type: application/json`
*   **Request Body:**
    ```json
    { "query": "Apple" } 
    // OR { "query": "AAPL" }
    ```
*   **Validation Rules:** `query` is required, must be a string, length between 1 and 50 characters, no special characters other than spaces/hyphens.
*   **Success Response (200):**
    ```json
    { "ticker": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ" }
    ```
*   **Not Found (404):**
    ```json
    { "error": "Company or ticker not found." }
    ```

### 3. `POST /api/runs`
*   **Method:** POST
*   **URL:** `/api/runs`
*   **Headers:** `Content-Type: application/json`
*   **Request Body:**
    ```json
    { "ticker": "AAPL" }
    ```
*   **Validation Rules:** `ticker` is required, must be a 1-5 character uppercase alphabetical string.
*   **Success Response (201 Created):**
    ```json
    { "runId": "64a7c8f9e4b0", "status": "processing", "ticker": "AAPL" }
    ```
*   **Validation Error (400):**
    ```json
    { "error": "Invalid ticker format." }
    ```

### 4. `GET /api/runs/:id/status`
*   **Method:** GET
*   **URL:** `/api/runs/:id/status`
*   **Headers:** None
*   **Request Body:** None
*   **Success Response (200):**
    ```json
    {
      "runId": "64a7c8f9e4b0",
      "status": "processing", 
      "currentAgent": "Financial Agent",
      "logs": [
        "[System]: Initializing run...",
        "[Research Agent]: Validated AAPL.",
        "[Financial Agent]: Fetching yfinance data..."
      ]
    }
    ```
*   **Not Found (404):**
    ```json
    { "error": "Run ID not found." }
    ```

### 5. `GET /api/runs/:id/report`
*   **Method:** GET
*   **URL:** `/api/runs/:id/report`
*   **Headers:** None
*   **Request Body:** None
*   **Success Response (200):**
    ```json
    {
      "runId": "64a7c8f9e4b0",
      "status": "completed",
      "ticker": "AAPL",
      "report": {
        "verdict": "BUY",
        "confidence": 85,
        "markdownBody": "## Overview\nApple Inc...",
        "citations": ["Yahoo Finance", "NewsAPI"]
      }
    }
    ```
*   **Pending Response (202 Accepted):** (If requested before completion)
    ```json
    { "status": "processing", "message": "Report is not ready yet." }
    ```

---

## 5. Error Codes

The API strictly adheres to standard REST HTTP status codes:
*   **200 OK:** Successful request.
*   **201 Created:** A new LangGraph analysis run was successfully queued/started.
*   **202 Accepted:** Request understood, but processing is still ongoing (used if report is requested too early).
*   **400 Bad Request:** Failed input validation (e.g., missing payload, invalid ticker string).
*   **404 Not Found:** Resource does not exist (invalid Run ID or unresolvable ticker).
*   **429 Too Many Requests:** The client has hit the rate limit (e.g., trying to spam AI generations).
*   **500 Internal Server Error:** An unhandled backend crash, LangGraph failure, or MongoDB connection failure.
*   **503 Service Unavailable:** An external API (Gemini, Yahoo Finance) is down.

---

## 6. API Lifecycle

How requests flow through the backend folder structure:

1.  **`POST /api/runs`**
    *   **Route:** `routes/runRoutes.js` intercepts the request.
    *   **Middleware:** Validates the `ticker` payload.
    *   **Controller:** `controllers/runController.js` creates a new `Run` document in MongoDB with status `processing`.
    *   **Service/AI:** Controller asynchronously triggers `ai/graph/orchestrator.js` to begin the LangGraph execution in the background.
2.  **`GET /api/runs/:id/status`**
    *   **Controller:** Fetches the `Run` model from MongoDB and returns the `logs` array, which the LangGraph agents actively append to during execution.
3.  **`GET /api/runs/:id/report`**
    *   **Controller:** Fetches the completed `Run` model from MongoDB. If status is `completed`, it returns the structured Markdown payload outputted by the Chairperson Agent.

---

## 7. Security Considerations

To ensure a robust MVP, the following backend security measures will be implemented:

*   **Input Validation:** All `POST` bodies will be validated using a library like `Zod` or `Joi` before hitting the controllers. This prevents NoSQL injection and malformed AI prompts.
*   **Rate Limiting:** `express-rate-limit` will be applied to the `/api/runs` endpoint (e.g., max 5 runs per IP per hour) to prevent malicious actors from exhausting free-tier Gemini or NewsAPI credits.
*   **API Key Protection:** **NO** API keys (Gemini, NewsAPI, Tavily, MongoDB URI) will ever be exposed to the React frontend. They remain strictly in the Node.js `.env` file.
*   **CORS:** `cors` middleware will be configured to only accept requests from the exact React frontend origin (e.g., `http://localhost:5173` or the specific Vercel URL), blocking cross-site request forgery.

---

## 8. Future APIs

These endpoints are explicitly excluded from the 7-day scope to prevent feature creep:
*   `POST /api/users/register` & `POST /api/users/login` (Authentication)
*   `GET /api/users/history` (User profile showing past generated reports)
*   `DELETE /api/runs/:id` (Allowing users to cancel/delete a report)
*   `GET /api/reports/export/pdf` (Server-side PDF generation of the Markdown report)
