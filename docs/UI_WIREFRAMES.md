# AlphaLens AI: UI Wireframes & Layout Architecture

This document defines the interface design, wireframes, and UX behavior for the three core screens of AlphaLens AI.

---

## 1. Home Screen

### 1. Screen Goal
To provide a frictionless, instantly understandable entry point for the user to initiate an AI-driven stock analysis.

### 2. ASCII Wireframe
```text
+----------------------------------------------------------+
|  [Logo] AlphaLens AI                                     |
|                                                          |
|                                                          |
|           Automated, evidence-based equity research      |
|           powered by multi-agent AI.                     |
|                                                          |
|           +------------------------------------+         |
|           | 🔍 Enter Ticker (e.g. AAPL)...     |         |
|           +------------------------------------+         |
|                  [ Generate AI Report ]                  |
|                                                          |
|           Try these:  [NVDA]  [MSFT]  [TSLA]             |
|                                                          |
+----------------------------------------------------------+
```

### 3. Section-by-section Layout
*   **Top:** Minimalist navigation bar with just the logo to establish branding.
*   **Center:** Hero copy, the primary search input, and the primary call-to-action (CTA) button.
*   **Bottom:** Suggested ticker pills horizontally aligned to reduce interaction cost.

### 4. Components
*   `Navbar`: Logo text.
*   `HeroText`: `<h1>` title and `<p>` subtitle.
*   `SearchInput`: Large, highly visible text field with a search icon.
*   `TickerPills`: Small interactive badges for suggested stocks.

### 5. Buttons
*   `Primary Button`: "Generate AI Report" (Solid background, prominent).
*   `Secondary Buttons`: Suggested ticker pills (Outlined, subtle hover effects).

### 6. Cards
*   None. (Kept flat to maintain absolute focus on the search bar).

### 7. Progress Indicators
*   None on the default state.

### 8. Empty State
*   Search bar is empty. The "Generate AI Report" button is visually disabled (greyed out).

### 9. Loading State
*   When "Generate AI Report" is clicked, the button text changes to "Initializing..." and shows a small spinning loader for 1 second before routing to the Analysis screen.

### 10. Error State
*   If the user enters special characters, a red inline validation message appears below the input: *"Invalid ticker format."*

### 11. Responsive Behavior
*   **Desktop:** Search bar is exactly 600px wide, centered.
*   **Tablet/Mobile:** Search bar spans 90% of the screen width. Suggested tickers wrap to multiple lines.

### 12. Accessibility Considerations
*   Search input has `aria-label="Stock ticker symbol"`.
*   High contrast ratio between the primary button and background.
*   Form can be submitted by pressing `Enter`.

### 13. Visual Hierarchy
*   The eye is drawn immediately to the Search Input -> then the Generate button -> then the suggested tickers.

### 14. Why this layout improves usability
*   By removing dashboards, login buttons, and sidebars, the user cannot get lost. The interface forces the user to engage with the product's core value proposition instantly.

---

## 2. Analysis Screen

### 1. Screen Goal
To keep the user engaged during the 45-second LLM execution time by visually proving the complex multi-agent LangGraph architecture is actively working.

### 2. ASCII Wireframe
```text
+----------------------------------------------------------+
|  [Logo] AlphaLens AI                          [ Cancel ] |
|----------------------------------------------------------|
|  Analyzing Apple Inc. (AAPL)...                          |
|                                                          |
|  [✓] Research Agent     | Done    | 2.1s  | 1 Source     |
|  [⟳] Financial Agent    | Running | 4.3s  | 4 Sources    |
|  [ ] News Agent         | Pending | --    | --           |
|  [ ] Risk Agent         | Pending | --    | --           |
|  [ ] Chairperson Agent  | Pending | --    | --           |
|                                                          |
|  +-- Live Terminal ------------------------------------+ |
|  | > Research Agent: Ticker validated.                 | |
|  | > Financial Agent: Fetching yfinance data...        | |
|  | > Financial Agent: Market Cap retrieved ($2.5T)     | |
|  | > _                                                 | |
|  +-----------------------------------------------------+ |
+----------------------------------------------------------+
```

### 3. Section-by-section Layout
*   **Header:** Brand logo and a "Cancel" button.
*   **Title:** Identifies the current ticker being processed.
*   **Agent Tracker:** A vertical list showing the status of all five agents.
*   **Live Terminal:** A dark-mode box streaming real-time logs.

### 4. Components
*   `AgentList`: A container holding `AgentRow` components.
*   `AgentRow`: Displays Agent Name, Status Icon, Duration, and Evidence Count.
*   `TerminalLog`: A scrolling text window.

### 5. Buttons
*   `Cancel`: Stops the API request and returns to the Home screen.

### 6. Cards
*   `TerminalBox`: A card styled like a code editor (dark background, monospace font).

### 7. Progress Indicators
*   Icons change from empty `[ ]` to spinning `[⟳]` to checkmark `[✓]`.
*   A live timer (`4.3s`) updates dynamically while an agent is running.

### 8. Empty State
*   N/A.

### 9. Loading State
*   This entire screen is a highly-engineered loading state.

### 10. Error State
*   If an agent crashes, the spinning icon becomes a red `[X]`. The terminal prints the error, and a "Try Again" button appears.

### 11. Responsive Behavior
*   **Desktop:** Agent list and Terminal are stacked vertically.
*   **Mobile:** Agent row data is condensed (hides duration/sources to save space).

### 12. Accessibility Considerations
*   Terminal logs are announced to screen readers using `aria-live="polite"`.
*   Icons are paired with text labels (e.g., "Running", "Done") for colorblind users.

### 13. Visual Hierarchy
*   The user's eye naturally goes to the spinning icon in the Agent Tracker, then down to the Terminal to read what is happening right now.

### 14. Why this layout improves usability
*   It turns a negative UX (waiting 45 seconds) into a positive, trust-building experience. It proves to an interviewer that the app is truly "multi-agent."

---

## 3. Report Screen

### 1. Screen Goal
To present the AI's final investment recommendation in a highly structured, scannable, and evidence-backed format.

### 2. ASCII Wireframe
```text
+----------------------------------------------------------+
|  < New Search                               [Download v] |
|----------------------------------------------------------|
|  AAPL - Apple Inc.                 Current Price: $150.00|
|                                                          |
|  +----------------------------------------------------+  |
|  |  RECOMMENDATION: BUY             Confidence: 85%   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  [ Company Summary ]                                     |
|  Apple designs, manufactures, and markets smartphones... |
|                                                          |
|  [ Financial Highlights ]                                |
|  • P/E Ratio: 25.4      • Market Cap: $2.5T              |
|                                                          |
|  +-------------------------+  +------------------------+ |
|  | [ Bull Case (News) ]    |  | [ Bear Case (Risk) ]   | |
|  | • Strong iPhone sales   |  | • Supply chain lag     | |
|  | • Services growth       |  | • Antitrust lawsuits   | |
|  +-------------------------+  +------------------------+ |
|                                                          |
|  [ Chairperson Verdict ]                                 |
|  Despite regulatory risks, the financials are extremely  |
|  strong, justifying a Buy rating for long-term holds.    |
|                                                          |
|  [ Evidence & Citations ]                                |
|  [1] Yahoo Finance (P/E data) [2] Reuters (Lawsuits)     |
|                                                          |
|  [ Agent Summary ]                                       |
|  Processed by 5 agents in 45.2s using LangGraph.         |
+----------------------------------------------------------+
```

### 3. Section-by-section Layout
*   **Navbar:** "New Search" back button on the left, "Download" dropdown on the right.
*   **Header:** Ticker, Name, and quantitative price data.
*   **Recommendation Banner:** High-contrast callout with the final verdict.
*   **Body Content:** Markdown-rendered text split into logical chunks. Bull/Bear cases are placed side-by-side (on desktop).
*   **Footer:** Citations and the meta Agent Summary.

### 4. Components
*   `VerdictBanner`: A colored full-width card (Green for Buy, Red for Sell, Grey for Hold).
*   `MetricCard`: Small cards for P/E, Market Cap.
*   `MarkdownRenderer`: Renders the textual analysis.
*   `CitationList`: A list of hyperlinked sources.

### 5. Buttons
*   `New Search` (Ghost button).
*   `Download`: A dropdown menu offering `Markdown (.md)` and `Raw Data (.json)`.

### 6. Cards
*   The Bull Case and Bear Case are rendered as distinct UI cards to visually separate opposing viewpoints.

### 7. Progress Indicators
*   N/A.

### 8. Empty State
*   N/A (Screen requires data payload).

### 9. Loading State
*   N/A (Loading happened on previous screen).

### 10. Error State
*   If Markdown parsing fails, a "Failed to display report layout" message appears with a button to download the raw JSON instead.

### 11. Responsive Behavior
*   **Desktop:** Bull and Bear case cards are displayed side-by-side (flex row).
*   **Tablet/Mobile:** Bull and Bear case cards stack vertically (flex col).

### 12. Accessibility Considerations
*   The Recommendation Banner uses both color (Green) and text ("BUY") to ensure colorblind accessibility.
*   Proper semantic HTML (`<h2>`, `<h3>`) ensures screen readers can navigate the report easily.

### 13. Visual Hierarchy
*   Recommendation Banner (biggest, boldest) -> Ticker/Price Header -> Sub-headings -> Body Text -> Citations.

### 14. Why this layout improves usability
*   Analysts need answers immediately. By putting the Verdict and Confidence Score at the very top, users get the TL;DR instantly. Placing citations at the bottom mimics academic and professional research standards, proving the AI is grounded in evidence.
