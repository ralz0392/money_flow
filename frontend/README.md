# Money Flow Frontend (Angular)

This is a minimal scaffold for the Money Flow Angular frontend.

Quick start (local):

1. Install Node.js 18+ and Angular CLI:
   npm install -g @angular/cli
2. Install dependencies:
   cd frontend
   npm install
3. Run dev server:
   npm start

Notes
- The app expects the backend to be available at `http://localhost:4000` (see `src/environments/environment.ts`).
- This scaffold includes core services (`ApiService`, `AuthService`, `AccountsService`, `TransactionsService`, `LoansService`, `AnalyticsService`) and pages (`Dashboard`, `Accounts`, `Transactions`, `Loans`, `Analytics`).
- It's purposefully simple to get you started quickly; I'll wire up forms, state management, and charts on request.
