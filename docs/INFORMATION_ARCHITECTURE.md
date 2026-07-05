# AlphaLens AI: Information Architecture

This document defines the structural layout and data sourcing for the three core screens of the AlphaLens AI application.

---

## 1. Home Screen

**1. Screen Purpose**
To serve as the minimal entry point for the user to input a stock ticker and initiate the AI research process.

**2. Information Hierarchy**
*   **Top:** Brand Identity (Logo/Name)
*   **Middle:** Core Call to Action (Search Bar & Button)
*   **Bottom:** Low-Friction Alternatives (Suggested Tickers)

**3. Sections**
*   Header
*   Search Area
*   Suggestions Area

**4. Components inside each section**
*   **Header:** Brand Logo, App Name, Tagline.
*   **Search Area:** Text Input Field, "Analyze" Button.
*   **Suggestions Area:** "Try these:" text label, 3-4 Clickable Ticker Pills (e.g., AAPL, TSLA, MSFT).

**5. User Actions**
*   Type a ticker symbol into the input field.
*   Click a Suggested Ticker Pill (auto-fills the input and submits).
*   Click the "Analyze" button (submits form).

**6. Why each section exists**
*   **Header:** Establishes brand context and professional tone.
*   **Search Area:** The primary functional requirement of the application.
*   **Suggestions Area:** Reduces friction for users (or interviewers) who want to test the app quickly without having to think of a valid ticker.

**7. Which information is dynamic**
The text inside the input field updates dynamically as the user types.

**8. Which information comes from APIs**
None. This screen is entirely static on the frontend.

**9. Which information comes from LangGraph**
None.

**10. Which information comes from MongoDB**
None.

**11. Empty State**
The search bar is empty by default. The "Analyze" button is visually disabled to prevent empty submissions.

**12. Loading State**
Upon clicking "Analyze", a small spinner appears on the button for 1-2 seconds before routing to the Analysis screen.

**13. Error State**
Inline red text appears below the input field if the user enters invalid characters (e.g., "Please enter a valid stock ticker format").

**14. Success State**
N/A (A successful submission routes immediately to the next screen).

---

## 2. Analysis Screen

**1. Screen Purpose**
To keep the user engaged during the slow LLM processing time and build immense trust by visually exposing the internal LangGraph multi-agent workflow.

**2. Information Hierarchy**
*   **Top:** Context (What is being analyzed)
*   **Middle:** Real-Time Process Feed (Agent Chatter)
*   **Bottom:** Progress Indicator

**3. Sections**
*   Header Context
*   Terminal / Chatter View
*   Progress Status

**4. Components inside each section**
*   **Header Context:** "Analyzing [TICKER]" title, Subtitle explaining the multi-agent process.
*   **Terminal / Chatter View:** A scrolling list of chat bubbles or terminal lines (e.g., `[Data Agent]: Fetching market cap...`).
*   **Progress Status:** A simple text indicator (e.g., "Step 2 of 5: News Retrieval") or a pulsing visual progress bar.

**5. User Actions**
*   None. This is a passive observation screen.

**6. Why each section exists**
*   **Header Context:** Reminds the user what they searched for.
*   **Terminal / Chatter View:** Demystifies the AI. Proves to the user (and the interviewer) that multiple distinct agents are being orchestrated, rather than a simple generic ChatGPT prompt.
*   **Progress Status:** Sets expectations so the user doesn't abandon the page during a 30-60 second wait.

**7. Which information is dynamic**
The scrolling feed of agent messages and the progress status update continuously.

**8. Which information comes from APIs**
None directly to the frontend. (The backend Express server makes the external API calls to Yahoo Finance/News).

**9. Which information comes from LangGraph**
The agent status messages. These are streamed from the Express backend (via Server-Sent Events or WebSockets) to the React frontend exactly as the LangGraph nodes execute.

**10. Which information comes from MongoDB**
If a cached report is found, this screen flashes briefly to indicate "Retrieving cached report..." before routing immediately to the Report screen, bypassing the LangGraph wait time.

**11. Empty State**
N/A.

**12. Loading State**
This entire screen *is* the application's primary loading state.

**13. Error State**
If the Express API or LangGraph fails, the terminal feed stops and displays red text: "Error: Could not complete analysis. [Reason]". A "Return Home" fallback button appears.

**14. Success State**
When LangGraph finishes, the feed displays a final success message (`[System]: Analysis Complete`) and automatically redirects to the Report Screen.

---

## 3. Report Screen

**1. Screen Purpose**
To deliver the final, structured investment recommendation synthesized by the AI in an easily readable format.

**2. Information Hierarchy**
*   **Top:** Company Identity & Core Quantitative Metrics
*   **Middle:** The Structured AI Report (Overview, Bull, Bear, Verdict)
*   **Bottom:** Utility Actions (Download, Start Over)

**3. Sections**
*   Ticker Header
*   AI Analysis Body
*   Action Footer

**4. Components inside each section**
*   **Ticker Header:** Company Name, Ticker Symbol, Current Price, Date of Analysis.
*   **AI Analysis Body:** Markdown renderer component displaying bold headers, bullet points, and paragraphs for the core sections.
*   **Action Footer:** "Download Markdown" Button, "Analyze Another Stock" Button.

**5. User Actions**
*   Read the report.
*   Click "Download Markdown" to save the file locally.
*   Click "Analyze Another Stock" to return to the Home screen.

**6. Why each section exists**
*   **Ticker Header:** Confirms the data matches the user's intent and provides immediate baseline context.
*   **AI Analysis Body:** Delivers the core value proposition of the product in a standardized, predictable format.
*   **Action Footer:** Provides utility (downloading) and creates an easy UX loop back to the start of the app.

**7. Which information is dynamic**
All text content, pricing, and report copy on this screen depend entirely on the ticker searched and the AI's generation.

**8. Which information comes from APIs**
The quantitative data in the header (Current Price, Company Name) comes from the Data Agent (via Yahoo Finance API) and is passed through the backend to the frontend.

**9. Which information comes from LangGraph**
The entire Markdown body of the report (Overview, Bull Case, Bear Case, Final Verdict) is the direct final output of the LangGraph Chairperson Agent.

**10. Which information comes from MongoDB**
If the user searched for a ticker that was recently analyzed, all information on this screen is populated directly from a saved MongoDB document rather than a live LangGraph run.

**11. Empty State**
N/A (The routing logic prevents accessing this screen without a data payload).

**12. Loading State**
N/A (Loading happens exclusively on the Analysis screen).

**13. Error State**
If the markdown fails to render or the payload is corrupt, a simple error boundary displays "Failed to load report data" with a "Go Back" button.

**14. Success State**
The report is fully visible, properly formatted with Markdown, and action buttons are interactive.

---

## Summary Table

| Screen | Sections | Components | Primary Action |
| :--- | :--- | :--- | :--- |
| **1. Home** | Header, Search Area, Suggestions Area | Logo, Input Field, Search Button, Suggested Ticker Pills | Submit a stock ticker to analyze. |
| **2. Analysis** | Header Context, Terminal View, Progress Status | Title, Scrolling Agent Chat Feed, Progress Indicator | Passive observation (wait for completion). |
| **3. Report** | Ticker Header, AI Analysis Body, Action Footer | Price/Name Header, Markdown Text Block, Download Button, Return Button | Read the AI insights & download the report. |
