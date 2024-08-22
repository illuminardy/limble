import express from 'express';
import { extractParams } from '../../middlewares/extractParams.js';
import workerRoutes from './workerRoutes.js';
import locationRoutes from './locationRoutes.js';

const router = express.Router();

router.use(extractParams);

router.use('/worker', workerRoutes);
router.use('/location', locationRoutes);

export default router;