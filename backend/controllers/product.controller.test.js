const db = require('../config/db.config');
const { GetAdminProducts } = require('./product.controller');

jest.mock('../config/db.config');

describe('GetAdminProducts', () => {
  it('should return data when a valid storeID is provided', (done) => {
    const req = { query: { storeID: 1 } };
    const res = {
      send: (data) => {
        expect(data).toEqual(expect.any(Array));
        expect(data.length).toBeGreaterThan(0);
        done();
      },
      status: () => res,
      statusMessage: ''
    };
    const mockQuery = jest.fn().mockImplementation((query, callback) => {
      callback(null, [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
    });
    db.query = mockQuery;

    GetAdminProducts(req, res);
  });

  it('should return an error message when an invalid storeID is provided', (done) => {
    const req = { query: { storeID: 'invalid' } };
    const res = {
      send: () => done.fail('Should not send data'),
      status: (statusCode) => {
        expect(statusCode).toBe(400);
        return res;
      },
      statusMessage: '',
      end: () => done()
    };
    const mockQuery = jest.fn().mockImplementation((query, callback) => {
      callback(new Error('Invalid storeID'), null, null);
    });
    db.query = mockQuery;

    GetAdminProducts(req, res);
  });
});
