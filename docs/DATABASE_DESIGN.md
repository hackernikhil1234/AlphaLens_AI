# AlphaLens AI: Database Design

## 1. Database Philosophy
MongoDB maps perfectly to the highly structured JSON outputs produced by our separated LangGraph architecture. It allows us to seamlessly store both the final analytical report chunks and the dynamic UI state (`agents` array) in a single document without complex relational modeling.

## 2. Collections
**Collections:** `runs`
Only one collection is required for the MVP.

## 3. Collection Schema
*   **`ticker`** (String, Required): The input stock symbol.
*   **`companyName`** (String, Optional): Resolved company name.
*   **`status`** (String Enum, Required): `['pending', 'processing', 'completed', 'failed']`
*   **`agents`** (Array of Objects): Directly powers the frontend UI tracker.
    *   `name` (String): e.g., "Research"
    *   `status` (String): e.g., "completed"
    *   `duration` (Number): Execution time in seconds.
    *   `evidence` (Number): Number of data points analyzed.
*   **`debugLogs`** (Array of Strings): Internal tracking for backend debugging.
*   **`report.recommendation`** (String): e.g., "BUY"
*   **`report.confidence`** (Number): e.g., 85
*   **`report.reasoning`** (String): High-level summary of the verdict.
*   **`report.sections`** (Object): Contains structured keys (e.g., `companySummary`, `financialAnalysis`, `bullCase`, `bearCase`) for React to format.
*   **`report.citations`** (Array of Strings): Sources used.

*(Note: `createdAt` and `updatedAt` are auto-generated via Mongoose timestamps).*

## 4. Mongoose Model Design
A single `Run` model mapping to the `runs` collection, using `{ timestamps: true }`.

## 5. Index Strategy
1.  **Index on `ticker` (Ascending):** For fast cache lookups.
2.  **Index on `createdAt` (Descending):** For TTL/staleness checks (e.g., expiring cache after 24 hours).

## 6. Document Lifecycle
*   **Pending:** POST request received. Express starts Data Collection.
*   **Processing:** LangGraph executes. The `agents` array is actively updated.
*   **Completed:** LangGraph finishes. `report` object is populated.
*   **Failed:** Data Collection or LangGraph throws a fatal error.

## 7. Relationships (Embedded vs Referenced)
Strictly embedded documents. The `report` and `agents` status array are embedded within the `Run` document to guarantee O(1) reads, eliminating the need for relational joins.

## 8. Validation Rules
Mongoose validation enforces proper enums for `status` and `agents[].status`. `report.confidence` must be an integer between 0 and 100.

## 9. Future Expansion
This schema can be expanded easily. Adding a `userId` allows for authentication integration or linking a `runs` document to a user's search history.
