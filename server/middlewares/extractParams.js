export function extractParams(req, res, next) {
  const workerIds = req.query.workerIds ? req.query.workerIds.split(',').map(id => parseInt(id, 10)) : [];
  const status = req.query.status || null;
  const locationIds = req.query.locationIds ? req.query.locationIds.split(',').map(id => parseInt(id, 10)) : [];
  
  req.filters = {
    workerIds,
    status,
    locationIds
  };

  next();
}