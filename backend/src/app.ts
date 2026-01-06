import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import accountsRouter from './routes/accounts.routes';
import transactionsRouter from './routes/transactions.routes';
import loansRouter from './routes/loans.routes';
import analyticsRouter from './routes/analytics.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/loans', loansRouter);
app.use('/api/analytics', analyticsRouter);

app.get('/healthz', (_, res) => res.json({ ok: true }));

export default app;
