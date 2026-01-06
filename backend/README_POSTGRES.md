# Money Flow Backend (TypeScript + Express + PostgreSQL)

## Quickstart (development)

### 1. Set up PostgreSQL and create the database

**Option A: Using pgAdmin (GUI)**
1. Open pgAdmin (https://www.pgadmin.org/)
2. Connect to your PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name: `money_flow` (or your preferred name)
5. Right-click the new database → Query Tool
6. Copy/paste the contents of `scripts/schema.sql` and run (F5)
7. Done! Tables are created.

**Option B: Using psql (command line)**
```bash
createdb money_flow
psql money_flow < scripts/schema.sql
```

### 2. Set up environment variables

Create `.env` file (copy from `.env.example`):
```
PORT=4000
JWT_SECRET=dummy-secret

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_NAME=money_flow
```

### 3. Install and run

```bash
npm install
npm run dev
```

Server health check:
```
GET http://localhost:4000/healthz
```

---

## API Endpoints (no authentication)

All endpoints are open — no JWT required for personal use.

**Accounts:**
- GET /api/accounts
- POST /api/accounts
- PUT /api/accounts/:id
- DELETE /api/accounts/:id

**Transactions:**
- GET /api/transactions
- POST /api/transactions

**Loans:**
- GET /api/loans
- POST /api/loans
- GET /api/loans/:id
- GET /api/loans/:id/schedule
- DELETE /api/loans/:id

**Analytics:**
- GET /api/analytics/overview
- GET /api/analytics/spending

---

## Database Schema

The schema includes:
- **accounts**: debit/credit accounts with balance tracking
- **transactions**: income, expense, transfers with category support
- **loans**: loan principal, rate, term, and calculated monthly payment
- **categories**: for transaction categorization (optional)
- **budgets**: for budget tracking (optional)

Run `scripts/schema.sql` to create all tables with indexes.

---

## Running tests

```bash
npm test
```

Docker (if available):
```bash
./scripts/test-in-docker.sh
```

CI: GitHub Actions workflow at `.github/workflows/nodejs.yml`

---

## Notes

- All transactions use database transactions (BEGIN/COMMIT/ROLLBACK) for atomicity.
- Account balances are updated in the same transaction as the transaction record.
- No authentication — suitable for personal single-user applications.
