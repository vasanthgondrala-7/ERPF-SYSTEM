## 🏗️ Construction ERP & Finance System with AI Insights

### A Full-Stack Enterprise Solution for Next-Gen Construction Management

---

### 🌟 Project Overview & Value Proposition

This project is the design and development of a prototype **Mini ERP & Finance System** specifically tailored for the construction industry. It manages Users, Finances (General Ledger, Invoices), and provides logic-based **"AI" insights** to help managers identify risks in projects. It goes beyond standard accounting by integrating essential construction management features with these insights to proactively manage project risk and forecast liquidity.

The core objective was to build a full-stack application demonstrating proficiency in:
* Building robust **RESTful APIs** with Node.js & Express.
* Designing complex **Relational Database Schemas (SQL)** for finance and project data.
* Implementing secure **JWT Authentication**.
* Translating advanced **business logic** (Financial Statements, Risk Algorithms) into code.

---

### 🧠 AI Insights & Risk Management Layer

A key differentiator of this system is the logic layer that provides predictive guidance to managers, based on business logic, not complex Machine Learning.

| Insight | Calculation Basis | Example Logic |
| :--- | :--- | :--- |
| **Predictive Risk Score** | Calculated based on Delayed Invoices, Budget Overrun, and Project Progress Mismatch. | If `actual_spend > budget`, mark Risk as "High". Or, if budget used is 20% greater than progress, add a penalty. |
| **Cash Flow Forecast** | Simple formula-based projection using the last 6 months of data to project the next month. | Used to generate the Cash Flow trend chart. |
| **Project Progress Insights** | Compares planned versus actual progress to highlight deviations and return a project health status. | Fetches project data to inform the "Al" logic. |

---

### 🧱 Core Functional Modules

#### 1. ERP Core Module
* **User Management & RBAC:** User registration/login with **JWT authentication** and defined roles (Admin, Finance Manager, Project Manager).
* **System Administration:** APIs for managing Users, Audit logs, and mock Integrations.
* **Dashboard API:** Supplies KPI data (projects, invoices, expenses, cash flow) and Alerts (delayed payments, project risks).

#### 2. Finance Module
* **General Ledger (GL):** CRUD for Chart of Accounts, Journal Entries (Add, Approve), and Account Reconciliation.
* **Financial Reporting:** Automated generation of Balance Sheet, P&L, and Cash Flow statements.
* **AR/AP:** Invoice creation & payment tracking, Vendor management, and Customer management.
* **Multi-Currency (Simplified):** Stores exchange rates and performs auto-conversion during invoice/payment processing.

---

### 💻 Technical Architecture & Stack

| Component | Technology | Rationale & Libraries |
| :--- | :--- | :--- |
| **Backend** | **Node.js (Express.js)** | Built robust REST APIs for all core modules, emphasizing clean architecture. |
| **Database** | **SQL (PostgreSQL/MySQL)** | Designed a comprehensive Relational Schema covering `users`, `accounts`, `invoices`, `projects`, and `exchange_rates`. |
| **Frontend** | **React.js** | Built a responsive and interactive UI for all required screens. |
| **Data Handling** | Axios | Used for efficient API integration and data fetching (e.g., fetching dashboard data on load). |
| **Visualization** | Chart.js / Recharts | Used to render dynamic data for Cash Flow Trends and Risk Scores. |

---

### ⚙️ Getting Started (Installation Guide)

Follow these steps to set up and run the system locally.

#### Prerequisites

* A computer with at least 8GB RAM.
* Code Editor (VS Code recommended).
* Node.js (Version 16 or higher).
* PostgreSQL or MySQL.
* Git & GitHub account.

#### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/vasanthgondrala-7/ERPF-SYSTEM.git](https://github.com/vasanthgondrala-7/ERPF-SYSTEM.git)
    cd ERPF-SYSTEM
    ```

2.  **Database Setup (Phase 1)**
    * Install your chosen SQL database.
    * Create the database named `construction_erp`.
    * Write SQL scripts to create tables for **Users, Accounts, Projects, and Invoices**.

3.  **Backend Setup (Phase 2)**
    * Navigate to the `/server` directory.
    * Install dependencies: `npm install express pg cors dotenv jsonwebtoken bcryptjs`.
    * Create and configure the **`.env`** file for database connection and secrets.
    * Start the server: `node index.js`. (Server runs on port 5000).

4.  **Frontend Setup (Phase 3)**
    * Navigate to the main folder and run: `npx create-vite client --template react`.
    * Navigate to the `/client` directory.
    * Install libraries: `npm install axios react-router-dom chart.js react-chartjs-2`.
    * Start the client: `npm run dev`.

---

### 📂 Key Deliverables

* **Frontend (React.js):** All required pages (Login, Dashboard, Finance, Admin) with charts and tables.
* **Backend (Node.js):** Implementation of all Core, Finance, and AI APIs, secured by JWT authentication.
* **SQL Database:** ER Diagram, necessary tables populated with sample data, and SQL models & migrations.
* **Documentation:** API documentation, comprehensive setup guide, and feature explanation.
