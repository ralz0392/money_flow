import { Request, Response } from 'express';
import { query } from '../config/firebase';

export async function overview(req: Request, res: Response) {
  try {
    const assetsResult = await query('SELECT COALESCE(SUM(balance), 0) as total FROM accounts WHERE type = $1', [
      'debit',
    ]);
    const liabilitiesResult = await query(
      'SELECT COALESCE(SUM(balance), 0) as total FROM accounts WHERE type = $1',
      ['credit']
    );

    const assets = Number(assetsResult.rows[0].total);
    const liabilities = Number(liabilitiesResult.rows[0].total);

    res.json({ assets, liabilities, net_worth: assets - liabilities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}

export async function spendingByCategory(req: Request, res: Response) {
  try {
    const result = await query(
      "SELECT category, SUM(amount) as total FROM transactions WHERE type = $1 GROUP BY category ORDER BY total DESC",
      ['expense']
    );

    const map: Record<string, number> = {};
    result.rows.forEach((row) => {
      const cat = row.category || 'Uncategorized';
      map[cat] = Number(row.total);
    });

    res.json(map);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
}
