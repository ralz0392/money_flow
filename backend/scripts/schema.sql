-- Money Flow Database Schema
-- Run this script in pgAdmin to set up the database

-- Create database (if not exists via CREATE DATABASE in pgAdmin UI)
-- Then connect to the database and run the following:

-- Create accounts table
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('debit', 'credit')),
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  amount NUMERIC(15, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
  account_id UUID REFERENCES accounts(id),
  from_account_id UUID REFERENCES accounts(id),
  to_account_id UUID REFERENCES accounts(id),
  category VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create loans table
CREATE TABLE loans (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  principal NUMERIC(15, 2) NOT NULL,
  annual_rate NUMERIC(5, 2) NOT NULL,
  term_months INTEGER NOT NULL,
  monthly_payment NUMERIC(15, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create categories table (optional, for future use)
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  created_at TIMESTAMP NOT NULL
);

-- Create budgets table (optional, for future use)
CREATE TABLE budgets (
  id UUID PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  month_year VARCHAR(7),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- Create indexes for common queries
CREATE INDEX idx_accounts_type ON accounts(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_category ON transactions(category);
