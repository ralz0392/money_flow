import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/firebase';

export async function listTransactions(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function createTransaction(req: Request, res: Response) {
  const client = await require('../config/firebase').getClient();

  try {
    await client.query('BEGIN');

    const id = uuidv4();
    const now = new Date().toISOString();
    const amount = Number(req.body.amount);
    const type = req.body.type;

    if (type === 'transfer') {
      const fromId = req.body.from_account_id;
      const toId = req.body.to_account_id;
      if (!fromId || !toId) throw new Error('Transfer requires from_account_id and to_account_id');

      // Check from account balance
      const fromResult = await client.query('SELECT balance FROM accounts WHERE id = $1', [fromId]);
      if (fromResult.rows.length === 0) throw new Error('From account not found');

      const fromBalance = Number(fromResult.rows[0].balance);
      if (fromBalance < amount) throw new Error('Insufficient funds');

      // Update both accounts
      const newFromBalance = fromBalance - amount;
      const toResult = await client.query('SELECT balance FROM accounts WHERE id = $1', [toId]);
      if (toResult.rows.length === 0) throw new Error('To account not found');

      const toBalance = Number(toResult.rows[0].balance);
      const newToBalance = toBalance + amount;

      await client.query('UPDATE accounts SET balance = $1, updated_at = $2 WHERE id = $3', [
        newFromBalance,
        now,
        fromId,
      ]);
      await client.query('UPDATE accounts SET balance = $1, updated_at = $2 WHERE id = $3', [
        newToBalance,
        now,
        toId,
      ]);

      // Record transaction
      await client.query(
        'INSERT INTO transactions (id, amount, type, from_account_id, to_account_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, amount, type, fromId, toId, now, now]
      );
    } else if (type === 'income' || type === 'expense') {
      const accountId = req.body.account_id;
      if (!accountId) throw new Error('account_id is required for income/expense');

      const accResult = await client.query('SELECT balance FROM accounts WHERE id = $1', [accountId]);
      if (accResult.rows.length === 0) throw new Error('Account not found');

      const balance = Number(accResult.rows[0].balance);
      const delta = type === 'income' ? amount : -amount;
      const newBalance = balance + delta;

      await client.query('UPDATE accounts SET balance = $1, updated_at = $2 WHERE id = $3', [
        newBalance,
        now,
        accountId,
      ]);

      await client.query(
        'INSERT INTO transactions (id, amount, type, account_id, category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, amount, type, accountId, req.body.category || null, now, now]
      );
    } else {
      await client.query(
        'INSERT INTO transactions (id, amount, type, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
        [id, amount, type, now, now]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ id, amount, type, created_at: now, updated_at: now });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error(err);
    if (
      err.message.includes('Insufficient funds') ||
      err.message.includes('required') ||
      err.message.includes('not found')
    ) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal error' });
  } finally {
    client.release();
  }
}
