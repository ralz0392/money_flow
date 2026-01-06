import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/firebase';

export async function listAccounts(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM accounts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function createAccount(req: Request, res: Response) {
  try {
    const id = uuidv4();
    const now = new Date().toISOString();
    const { name, type, balance } = req.body;

    const result = await query(
      'INSERT INTO accounts (id, name, type, balance, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, type, Number(balance || 0), now, now]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function updateAccount(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const now = new Date().toISOString();
    const { name, balance } = req.body;

    let updateFields = ['updated_at = $1'];
    let params: any[] = [now];
    let paramIndex = 2;

    if (name) {
      updateFields.push(`name = $${paramIndex}`);
      params.push(name);
      paramIndex++;
    }
    if (typeof balance !== 'undefined') {
      updateFields.push(`balance = $${paramIndex}`);
      params.push(Number(balance));
      paramIndex++;
    }

    params.push(id);
    const result = await query(
      `UPDATE accounts SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      params
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM accounts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
