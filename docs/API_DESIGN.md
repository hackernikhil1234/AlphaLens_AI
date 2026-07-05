# AlphaLens AI: REST API Design

## 1. API Overview
The API strictly separates data fetching from AI reasoning. It uses an asynchronous polling architecture where the client triggers a run, and then polls to receive structured JSON objects that perfectly drive the UI state (`agents` array) and the final report rendering (`report.sections`).

## 2. Endpoint List
1.  `GET /api/health`
2.  `POST /api/companies/resolve`
3.  `POST /api/runs`
4.  `GET /api/runs/:id/status`
5.  `GET /api/runs/:id/report`

## 3. & 4. Request & Response Formats

### 1. `GET /api/health`
*   **Success (200):** `{ "status": "ok" }`

### 2. `POST /api/companies/resolve`
*   **Body:** `{ "query": "Apple" }`
*   **Success (200):** `{ "ticker": "AAPL", "name": "Apple Inc." }`

### 3. `POST /api/runs`
*   **Body:** `{ "ticker": "AAPL" }`
*   **Success (201 Created):** `{ "runId": "64a7...", "status": "pending" }`

### 4. `GET /api/runs/:id/status`
*   **Method:** GET
*   **Success Response (200):**
    ```json
    {
      "runId": "64a7...",
      "status": "processing",
      "agents": [
        {
          "name": "Research Agent",
          "status": "completed",
          "duration": 4.2,
          "evidence": 3
        },
        {
          "name": "Financial Agent",
          "status": "running",
          "duration": null,
          "evidence": null
        }
      ]
    }
    ```

### 5. `GET /api/runs/:id/report`
*   **Method:** GET
*   **Success Response (200):**
    ```json
    {
      "runId": "64a7...",
      "status": "completed",
      "report": {
        "recommendation": "BUY",
        "confidence": 85,
        "reasoning": "Strong financials outweigh short-term risks.",
        "sections": {
           "companySummary": "Apple designs and manufactures...",
           "financialAnalysis": "P/E is 25.4...",
           "bullCase": "Strong services revenue...",
           "bearCase": "Supply chain lag..."
        },
        "citations": ["Yahoo Finance", "NewsAPI"]
      }
    }
    ```

## 5. Error Codes
*   **200 OK**, **201 Created**, **202 Accepted** (Polling not ready)
*   **400 Bad Request**, **404 Not Found**, **429 Too Many Requests**
*   **500 Internal Server Error**, **503 Service Unavailable** (Data Collection failed)

## 6. API Lifecycle
1.  **`POST /api/runs`**: Express invokes the Data Collection Service to pre-fetch APIs, then initializes LangGraph state.
2.  **`GET /api/runs/:id/status`**: Returns the `agents` array from MongoDB to power the live UI.
3.  **`GET /api/runs/:id/report`**: Returns the structured `report` JSON. React dynamically transforms the `sections` object into Markdown.

## 7. Security Considerations
Input validation (Zod), Rate limiting, API key protection (.env), and CORS restriction.

## 8. Future APIs
Auth, User profiles, PDF Exports.
