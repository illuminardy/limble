import { Router } from 'express';
import { getLocationCosts } from '../../services/locationService.js';

const router = Router();

router.get('/', async (req, res) => {
  const { workerIds, status, locationIds } = req.filters;

  try {
    const locationCosts = await getLocationCosts(status, workerIds, locationIds);
    res.json(locationCosts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;