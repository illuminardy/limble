export function getLocationCostsQuery(status, workerIds, locationIds) {
  let query = `
    SELECT locations.id as locationId, locations.name,
            SUM(logged_time.time_seconds / 3600 * workers.hourly_wage) AS totalCost
    FROM locations
    LEFT JOIN tasks ON locations.id = tasks.location_id
    LEFT JOIN logged_time ON tasks.id = logged_time.task_id
    LEFT JOIN workers ON logged_time.worker_id = workers.id
  `;


  let isValidStatus;
  if (status === 'completed' || status === 'incomplete') {
    isValidStatus = true;
    query += ` WHERE tasks.status = '${status}'`
  }

  let includesWorkerIds;
  if (workerIds && workerIds.length > 0) {
    includesWorkerIds = true;
    query += isValidStatus ? ` AND` : ` WHERE`;
    query += ` workers.id IN (${workerIds.map((val) => `${val}`).join(',')})`;
  }

  if (locationIds && locationIds.length > 0) {
    query += includesWorkerIds ? ` AND` : ` WHERE`;
    query += ` locations.id IN (${locationIds.map((val) => `${val}`).join(',')})`;
  }

  query += ` GROUP BY locations.id`;
  return query;
}