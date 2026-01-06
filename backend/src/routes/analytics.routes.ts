import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/overview', analyticsController.overview);
router.get('/spending', analyticsController.spendingByCategory);

export default router;
