import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/firebase';
import { monthlyPayment } from '../services/calculation.service';

export async function listLoans(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM loans');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function createLoan(req: Request, res: Response) {
  try {
    const id = uuidv4();
    const now = new Date().toISOString();
    const principal = Number(req.body.principal);
    const annual_rate = Number(req.body.annual_rate);
    const term_months = Number(req.body.term_months);

    const monthly_payment = monthlyPayment(principal, annual_rate, term_months);

    const result = await query(
      'INSERT INTO loans (id, name, principal, annual_rate, term_months, monthly_payment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [id, req.body.name || 'Loan', principal, annual_rate, term_months, monthly_payment, now, now]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function getLoan(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await query('SELECT * FROM loans WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function getLoanSchedule(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await query('SELECT * FROM loans WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });

    const data = result.rows[0];
    const { amortizationSchedule } = require('../services/calculation.service');
    const schedule = amortizationSchedule(data.principal, data.annual_rate, data.term_months);

    res.json({ ...data, schedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function deleteLoan(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await query('DELETE FROM loans WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
