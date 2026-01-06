# Personal Finance Application - Development Instructions

## Project Overview

A web application for managing personal finances for a single user. The application is built with a **Node.js backend** exposing a REST API and a **modern frontend using Angular**, HTML5, and Bootstrap. 

The backend and frontend are decoupled, enabling independent development and deployment.

## Technology Stack

### Backend

* **Runtime**: Node.js 18+
* **Framework**: Express.js
* **Language**: JavaScript or TypeScript (recommended)
* **Authentication**: JWT (with future multi-user support)

### Frontend

* **Framework**: Angular (latest LTS)
* **UI**: HTML5, Bootstrap 5
* **Charts**: Chart.js or ngx-charts
* **State Management**: Angular Services (NgRx optional)

### Deployment

* **Platform**: Render
* **Backend**: Node Web Service
* **Frontend**: Static Site (Angular build output)

## Architecture Overview

* Frontend consumes backend REST API
* Backend handles business logic, calculations, and persistence
* Authentication tokens are stored securely on the client

### Database

host:
db.dhwyryrjywhydzqrwsra.supabase.co

port:
5432

database:
postgres

user:
postgres

---

## Core Features

(All functional requirements remain the same as the original Flask version)

### 1. Account Management

Supports debit and credit accounts with full CRUD operations.

### 2. Transaction Management

Supports income, expense, transfer, withdrawal, and credit card payments.

### 3. Active Credits / Loans Module

Manages loans, payment tracking, amortization, and alerts.

### 4. Dashboard

Provides a financial overview including assets, liabilities, net worth, and charts.

### 5. Analytics

Advanced reporting with filters, charts, exports, and comparisons.

### 6. Budget Management

Monthly budgets, tracking, alerts, and suggestions.

### 7. Recurring Transactions

Automatic or reminder-based recurring transactions.

### 8. Reports

PDF and CSV exports, tax reports, and custom report builder.

---

## Backend Design (Node.js + Express)

### API Principles

* RESTful endpoints
* JSON request/response format
* Stateless authentication using JWT
* Input validation with middleware

### Example API Endpoints

* `GET /api/accounts`

* `POST /api/accounts`

* `PUT /api/accounts/:id`

* `DELETE /api/accounts/:id`

* `GET /api/transactions`

* `POST /api/transactions`

* `GET /api/loans`

* `POST /api/loans`

* `GET /api/analytics/overview`

* `GET /api/analytics/spending`

### Backend Folder Structure

```
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── env.js
│   ├── routes/
│   │   ├── accounts.routes.js
│   │   ├── transactions.routes.js
│   │   ├── loans.routes.js
│   │   ├── analytics.routes.js
│   ├── controllers/
│   │   ├── accounts.controller.js
│   │   ├── transactions.controller.js
│   │   ├── loans.controller.js
│   │   ├── analytics.controller.js
│   ├── services/
│   │   ├── calculation.service.js
│   │   ├── analytics.service.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   └── utils/
│       ├── date.utils.js
│       ├── currency.utils.js
├── package.json
└── .env
```

### Security Considerations

* Validate all incoming data
* Centralized error handling
* Enable CORS with proper restrictions

---

## Frontend Design (Angular + Bootstrap)

### Angular Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── accounts.service.ts
│   │   │   │   ├── transactions.service.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── pipes/
│   │   │   └── models/
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── accounts/
│   │   │   ├── transactions/
│   │   │   ├── loans/
│   │   │   └── analytics/
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── assets/
│   └── environments/
```

### UI/UX Requirements

* Fully responsive design
* Bootstrap-based layout system
* Reusable components
* Loading spinners for API calls
* Client-side form validation
* Accessibility compliance

---

## Development Phases

### Phase 1: Core Setup

* Initialize Node.js backend
* Create Angular project
* Set up API communication

### Phase 2: Account Management

* Implement account CRUD in backend
* Create Angular forms and views

### Phase 3: Transaction Management

* Implement transaction APIs
* Build transaction UI with filters

### Phase 4: Loans Module

* Loan CRUD and payment tracking
* Amortization calculations

### Phase 5: Dashboard

* Aggregated API endpoints
* Charts and summaries in Angular

### Phase 6: Analytics

* Advanced queries and visualizations
* Export functionality

### Phase 7: Advanced Features

* Budgets
* Recurring transactions
* Reports

### Phase 8: Optimization & Security

* Performance tuning
* Security review
* UI polish

---

## Deployment on Render

### Backend

* Type: Web Service
* Start Command: `node dist/server.js` or `npm start`

### Frontend

* Type: Static Site
* Build Command: `ng build --configuration production`
* Publish Directory: `dist/<app-name>`

---

## Documentation Requirements

* API documentation (OpenAPI / Swagger recommended)
* Environment setup guide
* Angular component documentation

---

## Performance Considerations

* Pagination on large lists
* Caching aggregated analytics
* Lazy loading Angular modules

---

This document replaces the original Flask-based architecture and reflects a modern, decoupled Node.js + Angular stack suitable for cloud deployment.
