import { Router } from 'express';
import { body, param } from 'express-validator';
import * as loansController from '../controllers/loans.controller';
import { validationHandler } from '../middleware/validation.middleware';

const router = Router();

router.get('/', loansController.listLoans);
router.post(
  '/',
  body('principal').isNumeric(),
  body('annual_rate').isNumeric(),
  body('term_months').isInt({ gt: 0 }),
  body('name').optional().isString(),
  validationHandler,
  loansController.createLoan
);

router.get('/:id', param('id').isString(), validationHandler, loansController.getLoan);
router.get('/:id/schedule', param('id').isString(), validationHandler, loansController.getLoanSchedule);
router.delete('/:id', param('id').isString(), validationHandler, loansController.deleteLoan);

export default router;
