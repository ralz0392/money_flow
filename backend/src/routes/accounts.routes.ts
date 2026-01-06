import { Router } from 'express';
import { body, param } from 'express-validator';
import * as accountsController from '../controllers/accounts.controller';
import { validationHandler } from '../middleware/validation.middleware';

const router = Router();

router.get('/', accountsController.listAccounts);

router.post(
  '/',
  body('name').isString().notEmpty(),
  body('type').isIn(['debit', 'credit']),
  body('balance').optional().isNumeric(),
  validationHandler,
  accountsController.createAccount
);

router.put(
  '/:id',
  param('id').isString(),
  body('name').optional().isString(),
  body('balance').optional().isNumeric(),
  validationHandler,
  accountsController.updateAccount
);

router.delete('/:id', param('id').isString(), validationHandler, accountsController.deleteAccount);

export default router;
