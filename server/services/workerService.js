import pool from '../database.js';
import { getWorkerCostsQuery } from '../queries/workerQueries.js';

export async function getWorkerCosts(status, workerIds, locationIds) {
  const query = getWorkerCostsQuery(status, workerIds, locationIds);

  const conn = await pool.getConnection();
  try {
    return await conn.query(query);
  } catch (error) {
    throw new Error(error.message);
  } finally {
    if (conn) conn.end();
  }
}