import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { validationHandler } from '../middleware/validation.middleware';

const router = Router();

// Simple auth route for single-user setup: exchange a username/password (env-driven) for a JWT
router.post(
  '/token',
  body('username').isString(),
  body('password').isString(),
  validationHandler,
  authController.token
);

export default router;
