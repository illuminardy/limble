import { getLocationCosts } from '../services/locationService.js';
import pool from '../database.js';

// Mock the pool module
jest.mock('../database.js', () => ({
  getConnection: jest.fn(() => Promise.resolve({ query: jest.fn(), end: jest.fn() }))
}))

describe('Location Service', () => {
  let mockQuery;
  let mockEnd;

  beforeEach(async() => {
    mockQuery = jest.fn();
    mockEnd = jest.fn()
    pool.getConnection = jest.fn(() => Promise.resolve({ query: mockQuery, end: jest.fn() }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    if (mockEnd) mockEnd();
  });

  it('ensures task status filter of completed is applied in worker cost query', async () => {
    // Arrange
    const status = 'completed';

    // Act
    await getLocationCosts(status);

    // Assert
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('WHERE tasks.status = \'completed\''));
  });

  it('ensures task status filter of incomplete is applied in worker cost query', async () => {
    // Arrange
    const status = 'incomplete';

    // Act
    await getLocationCosts(status);

    // Assert
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('WHERE tasks.status = \'incomplete\''));
  });

  it('ensures no status filter is applied by default in worker query', async () => {
    // Act
    await getLocationCosts();

    // Assert
    expect(mockQuery).toHaveBeenCalledWith(expect.not.stringContaining('WHERE tasks.status'));
  });

  it('ensures worker id and task status filter is applied in worker cost query', async () => {
    // Arrange
    const status = 'completed';
    const workerIds = [1, 2, 3];

    // Act
    await getLocationCosts(status, workerIds);

    // Assert
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('tasks.status = \'completed\''));
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('workers.id IN (1,2,3)'));
  });

  it('ensures worker id, status, and location IDs are aplied to worker cost query', async () => {
    const workerIds = [1, 2, 3];
    const locationIds = [10, 20, 30];
    const status = 'completed';
    await getLocationCosts(status, workerIds, locationIds);

    // Verify the query includes worker IDs, location IDs, and status
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('locations.id IN (10,20,30)'));
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('tasks.status = \'completed\''));
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('workers.id IN (1,2,3)'));
  });
});
