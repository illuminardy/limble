import pool from '../database.js';
import { getLocationCostsQuery } from '../queries/locationQueries.js';

export async function getLocationCosts(status, workerIds, locationIds) {
  const query = getLocationCostsQuery(status, workerIds, locationIds);

  const conn = await pool.getConnection();
  try {
    return await conn.query(query);
  } catch (error) {
    throw new Error(error.message);
  } finally {
    if (conn) conn.end();
  }
}