# money_flow
Application to handle personal finance topics
# Personal Finance Manager 💰

A comprehensive web-based personal finance management application built with Flask and Bootstrap, designed to help individuals take control of their financial life through intuitive account management, transaction tracking, and powerful analytics.

![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)
![Flask Version](https://img.shields.io/badge/flask-2.3+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

Personal Finance Manager is a full-featured web application that provides a centralized platform for managing all aspects of personal finances. Whether you're tracking daily expenses, managing multiple credit cards, monitoring loan payments, or analyzing spending patterns, this application offers the tools you need to make informed financial decisions.

### Why This Project?

Managing personal finances can be overwhelming with multiple bank accounts, credit cards, loans, and recurring expenses. This application simplifies financial management by:

- **Centralizing** all financial accounts in one place
- **Automating** balance calculations and transaction tracking
- **Visualizing** spending patterns and trends
- **Alerting** users to upcoming payments and budget limits
- **Providing** actionable insights through comprehensive analytics

### Who Is This For?

- Individuals looking to gain better control over their personal finances
- People managing multiple bank accounts and credit cards
- Users wanting detailed insights into their spending habits
- Anyone interested in budgeting and financial planning
- Developers looking to learn Flask and Firestore integration

## ✨ Features

### 🏦 Account Management

#### Debit Accounts
- Create and manage multiple checking, savings, and cash accounts
- Track real-time balances with automatic calculations
- Categorize accounts by type (checking, savings, cash, investment)
- Support for multiple currencies
- Activate/deactivate accounts without losing historical data

#### Credit Accounts
- Manage credit cards with credit limits and available credit tracking
- Monitor APR, payment due dates, and minimum payments
- Track credit utilization across all cards
- Set up alerts for payment deadlines
- Record rewards program information

### 💳 Transaction Management

- **Comprehensive Transaction Types**: Income, expenses, transfers, withdrawals, and credit card payments
- **Detailed Categorization**: 50+ pre-defined categories across income, housing, transportation, food, and more
- **Custom Categories**: Create your own categories to match your spending patterns
- **Rich Transaction Details**: 
  - Date and time stamps
  - Descriptions and memos
  - Attachments for receipts
  - Tags for additional organization
  - Status tracking (pending, cleared, reconciled)
- **Smart Filtering**: Search and filter by date, category, amount, or account
- **Bulk Operations**: Edit or delete multiple transactions at once

### 📊 Loan & Debt Management

- Track active loans (auto, personal, student, mortgage)
- Record payment schedules (weekly, bi-weekly, monthly)
- Monitor principal vs. interest breakdown
- View amortization schedules
- Calculate payoff dates and total interest
- Set up payment reminders

### 📈 Dashboard

Get a complete financial overview at a glance:

- **Net Worth Calculation**: Total assets minus total liabilities
- **Account Summaries**: Quick view of all account balances
- **Cash Flow Overview**: Monthly income vs. expenses
- **Upcoming Bills**: Never miss a payment with 30-day lookahead
- **Recent Activity**: Latest transactions across all accounts
- **Visual Trends**: Interactive charts showing balance history
- **Quick Stats**: Average spending, savings rate, debt-to-income ratio

### 📊 Analytics & Reports

#### Time-Based Analysis
- Select custom date ranges or use preset periods
- Compare month-over-month or year-over-year
- Identify seasonal spending patterns

#### Spending Analysis
- **Category Breakdown**: See exactly where your money goes with pie charts and percentages
- **Trend Analysis**: Track spending trends over time with line graphs
- **Top Merchants**: Identify your most frequent spending locations
- **Budget Comparison**: Compare actual spending to budgeted amounts

#### Income Analysis
- Track income sources and trends
- Calculate income consistency
- Monitor income growth over time

#### Cash Flow Reports
- Visualize monthly inflows vs. outflows
- Identify surplus or deficit periods
- Plan for large expenses

#### Debt Reports
- Track total debt over time
- Monitor debt payoff progress
- Calculate interest paid
- Project debt-free dates

#### Export Options
- Generate PDF reports for record-keeping
- Export transaction data to CSV/Excel
- Customizable report parameters

### 💰 Budget Management

- Create monthly or annual budgets by category
- Set income and savings goals
- Track budget performance in real-time
- Receive alerts when approaching limits
- View budget vs. actual comparisons
- Get suggestions for budget adjustments

### 🔄 Recurring Transactions

- Set up automatic transaction recording for bills and income
- Support for multiple frequencies (daily, weekly, bi-weekly, monthly, quarterly, annually)
- Option to auto-create transactions or receive reminders only
- Manage subscription tracking
- Edit or skip individual occurrences

### 📱 User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern design built with Bootstrap 5
- **Dark Mode**: Eye-friendly option for night-time usage
- **Fast Performance**: Optimized database queries and lazy loading
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Keyboard Shortcuts**: Quick access to common actions
- **Form Validation**: Real-time validation with helpful error messages

## 🖼️ Screenshots

> _Screenshots will be added as features are completed_

### Dashboard
![Dashboard](docs/images/dashboard.png)

### Transactions
![Transactions](docs/images/transactions.png)

### Analytics
![Analytics](docs/images/analytics.png)

## 🛠️ Technology Stack

### Backend
- **Framework**: Flask 2.3+
- **Language**: Python 3.9+
- **Database**: Google Cloud Firestore (NoSQL)
- **Authentication**: Flask-Login (for future multi-user support)
- **Forms**: Flask-WTF
- **Date Handling**: Python datetime

### Frontend
- **HTML5**: Semantic markup
- **CSS**: Bootstrap 5.3+
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Charts**: Chart.js for data visualization
- **Icons**: Bootstrap Icons

### Cloud Services
- **Database**: Google Cloud Firestore
- **Storage**: Firebase Storage (for receipt attachments)
- **Hosting**: Compatible with any WSGI server

### Development Tools
- **Version Control**: Git
- **Package Management**: pip
- **Environment Management**: virtualenv/venv
- **Testing**: pytest
- **Code Quality**: pylint, black

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9 or higher**
- **pip** (Python package installer)
- **Git** (for cloning the repository)
- **Google Cloud Account** (for Firestore database)
- **Modern web browser** (Chrome, Firefox, Safari, or Edge)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ralz0392/money_flow.git
cd personal-finance-manager
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Google Cloud Firestore

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Firestore API
4. Create a Firestore database (select Native mode)
5. Create a service account and download the JSON key file
6. Place the key file in the project root (don't commit it to Git!)

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```bash
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/serviceAccountKey.json
FIRESTORE_PROJECT_ID=your-project-id
```

### 6. Initialize the Database

```bash
python init_db.py
```

### 7. Run the Application

```bash
flask run
```

The application will be available at `http://localhost:5000`

## ⚙️ Configuration

### Firebase Configuration

Edit `config.py` to customize Firebase settings:

```python
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FIRESTORE_PROJECT_ID = os.environ.get('FIRESTORE_PROJECT_ID')
    # Add other configuration variables
```

### Application Settings

Customize application behavior in `config.py`:

- Default currency
- Date format
- Pagination settings
- File upload limits
- Session timeout

## 📖 Usage

### Getting Started

1. **Add Your Accounts**: Start by adding your bank accounts and credit cards
2. **Create Categories**: Customize transaction categories to match your spending
3. **Record Transactions**: Add your recent transactions manually or import from CSV
4. **Set Up Budgets**: Create monthly budgets for each category
5. **Add Recurring Items**: Set up automatic tracking for bills and income
6. **Monitor Dashboard**: Check your financial overview regularly
7. **Analyze Trends**: Use the analytics page to understand your spending patterns

### Common Workflows

#### Recording a Purchase
1. Navigate to Transactions → Add Transaction
2. Select the account used
3. Enter amount and choose category
4. Add description and any tags
5. Save the transaction

#### Tracking a Loan Payment
1. Go to Loans → Select the loan
2. Click "Record Payment"
3. Enter payment amount and date
4. View updated balance and schedule

#### Creating a Monthly Budget
1. Navigate to Budget → Create Budget
2. Select the month and year
3. Allocate amounts to each category
4. Save and monitor throughout the month

#### Generating Reports
1. Go to Analytics
2. Select date range
3. Choose report type
4. View visualizations and insights
5. Export to PDF or CSV if needed

## 📁 Project Structure

```
personal-finance-manager/
│
├── app/
│   ├── __init__.py                 # Application factory
│   ├── config.py                   # Configuration settings
│   │
│   ├── models/                     # Data models
│   │   ├── __init__.py
│   │   ├── account.py
│   │   ├── transaction.py
│   │   ├── loan.py
│   │   ├── budget.py
│   │   └── category.py
│   │
│   ├── routes/                     # Route handlers
│   │   ├── __init__.py
│   │   ├── main.py                 # Dashboard and main routes
│   │   ├── accounts.py             # Account management
│   │   ├── transactions.py         # Transaction operations
│   │   ├── loans.py                # Loan management
│   │   ├── budgets.py              # Budget features
│   │   └── analytics.py            # Analytics and reports
│   │
│   ├── services/                   # Business logic
│   │   ├── __init__.py
│   │   ├── firestore_service.py    # Database operations
│   │   ├── calculation_service.py  # Financial calculations
│   │   ├── analytics_service.py    # Analytics processing
│   │   └── export_service.py       # Report generation
│   │
│   ├── static/                     # Static assets
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── dark-mode.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── charts.js
│   │   │   └── validation.js
│   │   └── images/
│   │       └── logo.png
│   │
│   └── templates/                  # Jinja2 templates
│       ├── base.html
│       ├── dashboard.html
│       ├── accounts/
│       │   ├── list.html
│       │   ├── create.html
│       │   └── detail.html
│       ├── transactions/
│       │   ├── list.html
│       │   ├── create.html
│       │   └── detail.html
│       ├── loans/
│       │   ├── list.html
│       │   └── detail.html
│       ├── budgets/
│       │   └── manage.html
│       └── analytics/
│           └── reports.html
│
├── tests/                          # Test suite
│   ├── __init__.py
│   ├── test_accounts.py
│   ├── test_transactions.py
│   └── test_calculations.py
│
├── docs/                           # Documentation
│   ├── images/
│   └── api.md
│
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── requirements.txt                # Python dependencies
├── init_db.py                      # Database initialization
├── run.py                          # Application entry point
├── README.md                       # This file
└── LICENSE                         # License information
```

## 🗄️ Database Schema

### Collections Overview

#### debit_accounts
```javascript
{
  account_id: string,
  user_id: string,
  account_name: string,
  account_type: string,
  initial_balance: number,
  current_balance: number,
  currency: string,
  status: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### credit_accounts
```javascript
{
  account_id: string,
  user_id: string,
  card_name: string,
  credit_limit: number,
  current_balance: number,
  apr: number,
  payment_due_date: number,
  minimum_payment: number,
  status: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### transactions
```javascript
{
  transaction_id: string,
  user_id: string,
  account_id: string,
  date: timestamp,
  amount: number,
  type: string,
  category: string,
  description: string,
  tags: array,
  status: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

_See [Database Documentation](docs/database.md) for complete schema details_

## 📚 API Documentation

### Account Endpoints

- `GET /api/accounts` - List all accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/<id>` - Get account details
- `PUT /api/accounts/<id>` - Update account
- `DELETE /api/accounts/<id>` - Delete account

### Transaction Endpoints

- `GET /api/transactions` - List transactions with filters
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/<id>` - Get transaction details
- `PUT /api/transactions/<id>` - Update transaction
- `DELETE /api/transactions/<id>` - Delete transaction

_See [API Documentation](docs/api.md) for complete endpoint details_

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow PEP 8 style guide for Python code
- Use meaningful variable and function names
- Write docstrings for all functions and classes
- Add unit tests for new features
- Update documentation as needed

### Reporting Issues

Please use GitHub Issues to report bugs or suggest features. Include:

- Clear description of the issue
- Steps to reproduce (for bugs)
- Expected vs. actual behavior
- Screenshots if applicable
- Your environment (OS, Python version, browser)

## 🗺️ Roadmap

### Version 1.0 (Current Development)
- ✅ Core account management
- ✅ Transaction tracking
- ✅ Basic analytics
- 🚧 Budget management
- 🚧 Loan tracking

### Version 1.1 (Planned)
- 📋 Recurring transactions
- 📋 Advanced reports
- 📋 Data export/import
- 📋 Bill reminders

### Version 2.0 (Future)
- 📋 Multi-user support with authentication
- 📋 Bank account integration (Plaid API)
- 📋 Mobile application
- 📋 Receipt OCR scanning
- 📋 Investment portfolio tracking
- 📋 Tax reporting features
- 📋 Expense splitting for shared costs
- 📋 Multi-currency support with exchange rates

### Version 3.0 (Ideas)
- 📋 AI-powered spending insights
- 📋 Predictive analytics
- 📋 Financial goal planning
- 📋 Credit score monitoring
- 📋 Cryptocurrency tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/personal-finance-manager](https://github.com/yourusername/personal-finance-manager)

## 🙏 Acknowledgments

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [Google Cloud Firestore](https://cloud.google.com/firestore)
- [Font Awesome Icons](https://fontawesome.com/)
- All contributors who help improve this project

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/personal-finance-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/personal-finance-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/personal-finance-manager)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/personal-finance-manager)

---

Made with ❤️ by ralz0392

*"Take control of your financial future, one transaction at a time."*