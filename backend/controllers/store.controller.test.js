const { GetAdminStores } = require('./store.controller');
const db = require('../config/db.config');

describe('GetAdminStores function', () => {
  test('returns stores data for a given supplier ID', async () => {
    const mockQueryResult = [{
      id: 1,
      name: 'Store 1',
      supplier_id: 1,
    },
    {
      id: 2,
      name: 'Store 2',
      supplier_id: 1,
    }];
    const mockDbQuery = jest.spyOn(db, 'query').mockImplementation((query, callback) => {
      callback(null, mockQueryResult, {});
    });

    const mockReq = {
      query: {
        supplierID: 1,
      },
    };
    const mockRes = {
      send: jest.fn(),
    };

    await GetAdminStores(mockReq, mockRes);

    expect(mockDbQuery).toHaveBeenCalledWith('CALL GetAdminStores(1);', expect.any(Function));
    expect(mockRes.send).toHaveBeenCalledWith(mockQueryResult);

    mockDbQuery.mockRestore();
  });

  test('returns error message if database query fails', async () => {
    const mockError = new Error('Database query failed');
    const mockDbQuery = jest.spyOn(db, 'query').mockImplementation((query, callback) => {
      callback(mockError, null, {});
    });

    const mockReq = {
      query: {
        supplierID: 1,
      },
    };
    const mockRes = {
      status: jest.fn(() => mockRes),
      end: jest.fn(),
      statusMessage: '',
    };

    await GetAdminStores(mockReq, mockRes);

    expect(mockDbQuery).toHaveBeenCalledWith('CALL GetAdminStores(1);', expect.any(Function));
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.end).toHaveBeenCalled();
    expect(mockRes.statusMessage).toContain(mockError.message);

    mockDbQuery.mockRestore();
  });
});
