import { Router } from 'express';
import { getWorkerCosts } from '../../services/workerService.js';

const router = Router();

router.get('/', async (req, res) => {
  const { workerIds, status, locationIds } = req.filters;

  try {
    const workerCosts = await getWorkerCosts(status, workerIds, locationIds);
    res.json(workerCosts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
