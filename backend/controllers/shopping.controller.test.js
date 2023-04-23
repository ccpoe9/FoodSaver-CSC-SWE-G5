const db = require('../config/db.config');
const controller = require('./shopping.controller');

describe('AddtoCart', () => {
  test('should add product to cart', () => {
    const req = { body: { customerID: 1, productID: 2, storeID: 3 } };
    const res = { send: jest.fn() };

    // Mock db.query function
    db.query = jest.fn((query, callback) => {
      callback(null, 'success');
    });

    controller.AddtoCart(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'CALL AddtoCart(1,2,3);',
      expect.any(Function)
    );
    expect(res.send).toHaveBeenCalledWith('success');
  });

  test('should return error when there is an SQL error', () => {
    const req = { body: { customerID: 1, productID: 2, storeID: 3 } };
    const res = { statusMessage: null, status: jest.fn(), end: jest.fn() };
    const error = new Error('Something went wrong');

    // Mock db.query function to return an error
    db.query = jest.fn((query, callback) => {
      callback(error);
    });

    controller.AddtoCart(req, res);

    expect(db.query).toHaveBeenCalledWith(
      'CALL AddtoCart(1,2,3);',
      expect.any(Function)
    );
    expect(res.statusMessage).toEqual('SQL Error : Something went wrong');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.end).toHaveBeenCalled();
  });
});
