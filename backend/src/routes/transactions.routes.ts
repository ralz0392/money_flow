import { Router } from 'express';
import { body } from 'express-validator';
import * as txController from '../controllers/transactions.controller';
import { validationHandler } from '../middleware/validation.middleware';

const router = Router();

router.get('/', txController.listTransactions);

router.post(
  '/',
  body('amount').isNumeric(),
  body('type').isIn(['income', 'expense', 'transfer']),
  body('account_id').optional().isString(),
  body('from_account_id').optional().isString(),
  body('to_account_id').optional().isString(),
  body('category').optional().isString(),
  validationHandler,
  txController.createTransaction
);

export default router;
