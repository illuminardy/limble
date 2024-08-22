export function getWorkerCostsQuery(status, workerIds, locationIds) {
  let query = `
      SELECT workers.id as workerId, workers.username, SUM(logged_time.time_seconds / 3600 * workers.hourly_wage) AS totalCost
      FROM workers
      LEFT JOIN logged_time ON workers.id = logged_time.worker_id
      LEFT JOIN tasks ON logged_time.task_id = tasks.id
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

  query += ` GROUP BY workers.id`;
  return query;
};