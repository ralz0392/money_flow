# Personal Finance Application - Development Instructions

## Project Overview
A web application for managing personal finances for a single user, built with Flask (Python) backend and HTML5/Bootstrap frontend, using Google Cloud Firestore as the database.

## Technology Stack
- **Backend**: Flask (Python)
- **Frontend**: HTML5, Bootstrap 5
- **Database**: Google Cloud Firestore
- **Authentication**: Flask-Login (for future multi-user support)
- **Environment**: Python 3.9+

## Core Features

### 1. Account Management

#### Debit Accounts
- Create, edit, and delete debit accounts (checking, savings, cash, etc.)
- Fields for each account:
  - Account name (e.g., "Chase Checking")
  - Account type (checking, savings, cash, investment)
  - Initial balance
  - Current balance (calculated automatically)
  - Currency (default: USD)
  - Account number (optional, last 4 digits for privacy)
  - Status (active/inactive)
  - Created date

#### Credit Accounts
- Create, edit, and delete credit card accounts
- Fields for each account:
  - Card name (e.g., "Chase Freedom")
  - Credit limit
  - Current balance (amount owed)
  - Available credit (calculated: limit - balance)
  - APR (Annual Percentage Rate)
  - Payment due date
  - Minimum payment amount
  - Statement closing date
  - Status (active/inactive/closed)
  - Rewards program details (optional)

### 2. Transaction Management

#### Transaction Types
- **Income**: Paycheck, deposits, refunds, transfers in
- **Expense**: Purchases, bills, fees, transfers out
- **Transfer**: Between accounts (debit to debit, or payment to credit)
- **Withdrawal**: ATM withdrawals, cash out
- **Payment**: Credit card payments from debit accounts

#### Transaction Fields
- Date and time
- Amount
- Transaction type
- Category (see Categories section)
- Description/memo
- Account (source account)
- Destination account (for transfers)
- Payment method (cash, card, transfer, check)
- Receipt/attachment support (optional image upload)
- Tags (for additional organization)
- Recurring flag (yes/no)
- Status (pending/cleared/reconciled)

#### Transaction Categories
Create a comprehensive category system:
- **Income**: Salary, Freelance, Investments, Gifts, Refunds, Other Income
- **Housing**: Rent/Mortgage, Property Tax, Home Insurance, Utilities, Maintenance, HOA Fees
- **Transportation**: Car Payment, Gas, Parking, Public Transit, Car Insurance, Maintenance
- **Food**: Groceries, Restaurants, Coffee Shops, Fast Food
- **Utilities**: Electricity, Water, Gas, Internet, Phone, Streaming Services
- **Healthcare**: Insurance, Doctor Visits, Pharmacy, Dental, Vision
- **Shopping**: Clothing, Electronics, Home Goods, Personal Care
- **Entertainment**: Movies, Events, Hobbies, Games, Books
- **Education**: Tuition, Books, Courses, Supplies
- **Debt Payments**: Credit Cards, Loans, Student Loans
- **Savings**: Emergency Fund, Retirement, Investments
- **Personal**: Haircuts, Gym, Subscriptions
- **Miscellaneous**: Uncategorized expenses

Allow users to add custom categories.

### 3. Active Credits/Loans Module

#### Loan/Credit Management
- Create, edit, and delete active loans
- Fields for each loan:
  - Loan name (e.g., "Car Loan", "Personal Loan")
  - Lender name
  - Principal amount (original loan amount)
  - Current balance
  - Interest rate (APR)
  - Payment amount
  - Payment frequency (weekly, bi-weekly, monthly)
  - Payment due date
  - Start date
  - End date / Term length
  - Loan type (personal, auto, student, mortgage, etc.)
  - Status (active/paid off/delinquent)

#### Payment Tracking
- Track all payments made toward each loan
- Calculate remaining balance after each payment
- Show principal vs. interest breakdown
- Display amortization schedule
- Alert for upcoming payments

### 4. Dashboard / General Balance

#### Overview Display
- Total assets (sum of all debit account balances)
- Total liabilities (sum of credit card balances + active loans)
- Net worth (assets - liabilities)
- Available credit across all credit cards
- Monthly income vs. expenses
- Upcoming bills and due dates (next 30 days)
- Recent transactions (last 10-20)

#### Visual Elements
- Balance trends chart (last 6 months)
- Expense breakdown by category (pie chart)
- Income vs. expenses comparison (bar chart)
- Budget progress indicators

### 5. Analytics Page

#### Time Period Selection
- Predefined periods: This month, Last month, Last 3 months, Last 6 months, This year, Last year
- Custom date range selector

#### Analytics Features
- **Spending Analysis**:
  - Total spent by category (with percentages)
  - Category trends over time
  - Top merchants/payees
  - Average daily/weekly/monthly spending
  
- **Income Analysis**:
  - Total income by source
  - Income trends over time
  - Income vs. expenses ratio
  
- **Account Analysis**:
  - Balance history for each account
  - Account activity summary
  - Highest/lowest balances
  
- **Budget vs. Actual**:
  - Compare planned budget to actual spending
  - Identify overspending categories
  
- **Cash Flow**:
  - Monthly cash flow visualization
  - Inflows vs. outflows
  
- **Debt Analysis**:
  - Debt payoff progress
  - Interest paid over time
  - Projected payoff dates

#### Export Functionality
- Export reports to PDF
- Export transaction data to CSV/Excel
- Date range selection for exports

### 6. Budget Management (Additional Feature)

#### Budget Creation
- Set monthly budgets by category
- Set income goals
- Set savings goals
- Recurring budget templates

#### Budget Tracking
- Real-time budget vs. actual spending
- Progress bars for each category
- Alerts when approaching or exceeding budget
- Suggestions for budget adjustments

### 7. Recurring Transactions

#### Setup Recurring Items
- Schedule automatic transaction recording
- Frequencies: daily, weekly, bi-weekly, monthly, quarterly, annually
- End date or perpetual
- Auto-create transactions or reminders only

### 8. Reports

#### Available Reports
- Net worth statement
- Cash flow statement
- Income statement
- Spending by category
- Account activity report
- Tax-related expenses report
- Custom report builder

## Technical Requirements

### Database Structure (Firestore)

#### Collections
1. **users** (for future expansion)
   - user_id
   - email
   - name
   - preferences
   - created_at

2. **debit_accounts**
   - account_id
   - user_id
   - account_name
   - account_type
   - initial_balance
   - current_balance
   - currency
   - status
   - created_at
   - updated_at

3. **credit_accounts**
   - account_id
   - user_id
   - card_name
   - credit_limit
   - current_balance
   - apr
   - payment_due_date
   - minimum_payment
   - status
   - created_at
   - updated_at

4. **transactions**
   - transaction_id
   - user_id
   - account_id
   - date
   - amount
   - type
   - category
   - description
   - tags
   - status
   - created_at
   - updated_at

5. **loans**
   - loan_id
   - user_id
   - loan_name
   - lender
   - principal
   - current_balance
   - interest_rate
   - payment_amount
   - payment_frequency
   - due_date
   - start_date
   - end_date
   - status
   - created_at
   - updated_at

6. **categories**
   - category_id
   - user_id
   - name
   - type (income/expense)
   - parent_category
   - icon
   - color

7. **budgets**
   - budget_id
   - user_id
   - category_id
   - amount
   - period (month/year)
   - start_date
   - end_date

### Backend Structure

```
app/
├── __init__.py
├── config.py
├── models/
│   ├── __init__.py
│   ├── account.py
│   ├── transaction.py
│   ├── loan.py
│   ├── budget.py
│   └── category.py
├── routes/
│   ├── __init__.py
│   ├── main.py
│   ├── accounts.py
│   ├── transactions.py
│   ├── loans.py
│   ├── analytics.py
│   └── api.py
├── services/
│   ├── __init__.py
│   ├── firestore_service.py
│   ├── calculation_service.py
│   └── analytics_service.py
├── static/
│   ├── css/
│   ├── js/
│   └── images/
└── templates/
    ├── base.html
    ├── dashboard.html
    ├── accounts/
    ├── transactions/
    ├── loans/
    └── analytics/
```

### Security Considerations
- Use environment variables for sensitive data (Firebase credentials)
- Firebase credentials are present on the .json file encoded-stage-149515-687d686b6881.json
- Implement CSRF protection
- Sanitize all user inputs
- Use HTTPS in production
- Implement proper error handling without exposing sensitive information
- Add data validation on both frontend and backend

### UI/UX Requirements
- Responsive design (mobile-friendly)
- Consistent color scheme (green for income/positive, red for expenses/negative)
- Loading indicators for async operations
- Confirmation dialogs for delete operations
- Form validation with clear error messages
- Intuitive navigation
- Keyboard shortcuts for common actions
- Accessibility compliance (ARIA labels, proper contrast)

### Additional Features to Consider
- Dark mode toggle
- Multiple currency support
- Bill reminders/notifications
- Goal tracking (savings goals)
- Receipt scanning (OCR)
- Bank account integration (Plaid API)
- Data backup and restore
- Import transactions from CSV/OFX files
- Mobile app companion
- Expense splitting for shared expenses
- Tax category tagging
- Investment tracking

## Development Phases

### Phase 1: Core Setup
- Set up Flask application structure
- Configure Firestore connection
- Create base templates with Bootstrap
- Implement basic routing

### Phase 2: Account Management
- Implement debit account CRUD operations
- Implement credit account CRUD operations
- Create account listing and detail pages

### Phase 3: Transaction Management
- Implement transaction CRUD operations
- Create transaction forms with category selection
- Implement transaction listing with filters

### Phase 4: Loans Module
- Implement loan CRUD operations
- Add payment tracking
- Create amortization calculations

### Phase 5: Dashboard
- Calculate and display general balance
- Implement overview widgets
- Add recent activity feed

### Phase 6: Analytics
- Implement date range filtering
- Create spending analysis charts
- Add category breakdowns
- Implement export functionality

### Phase 7: Advanced Features
- Add budget management
- Implement recurring transactions
- Create reports module
- Add data export/import

### Phase 8: Polish & Optimization
- Optimize database queries
- Improve UI/UX
- Add comprehensive error handling
- Security audit

## Documentation Requirements
- API documentation (if exposing endpoints)
- User manual
- Installation guide
- Database schema documentation
- Code comments for complex logic

## Performance Considerations
- Implement pagination for transaction lists
- Cache frequently accessed data
- Optimize Firestore queries (use indexes)
- Lazy load analytics charts
- Minimize database reads/writes

## Deployment
- Use gunicorn or uWSGI for production
- Set up proper logging
- Configure environment-specific settings
- Set up monitoring and alerts
- Regular database backups