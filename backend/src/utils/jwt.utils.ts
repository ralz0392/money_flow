import jwt from 'jsonwebtoken';

export function sign(payload: object, expiresIn = '7d') {
  const secret = process.env.JWT_SECRET || 'changeme';
  return jwt.sign(payload, secret, { expiresIn });
}

export function verify(token: string) {
  const secret = process.env.JWT_SECRET || 'changeme';
  return jwt.verify(token, secret);
}
