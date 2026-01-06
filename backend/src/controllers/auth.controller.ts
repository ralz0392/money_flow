import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const USERNAME = process.env.SUPERUSER_USERNAME || 'admin';
const PASSWORD = process.env.SUPERUSER_PASSWORD || 'password';

export function token(req: Request, res: Response) {
  const { username, password } = req.body;
  if (username !== USERNAME || password !== PASSWORD) return res.status(401).json({ error: 'Invalid credentials' });

  const payload = { sub: username, role: 'admin' };
  const secret = process.env.JWT_SECRET || 'changeme';
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });

  res.json({ token });
}
