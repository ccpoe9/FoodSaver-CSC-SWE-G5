const db = require('../config/db.config');
const { SignUp, Login, AdminLogin, GetUserInfo } = require('./user.controller');

jest.mock('../config/db.config');

describe('SignUp', () => {
  it('should call the database with the correct query', () => {
    const req = { body: { Username: 'testuser', Password: 'testpassword' } };
    const res = { send: jest.fn() };
    const queryMock = jest.fn();

    db.query.mockImplementation(queryMock);

    SignUp(req, res);

    expect(queryMock).toHaveBeenCalledWith(
      "CALL CustomerSignUp('testuser', 'testpassword');",
      expect.any(Function),
    );
  });

  it('should return a response with data if the database query succeeds', () => {
    const req = { body: { Username: 'testuser', Password: 'testpassword' } };
    const res = { send: jest.fn() };
    const queryMock = jest.fn((_, callback) => {
      const data = { message: 'success' };
      callback(null, data);
    });

    db.query.mockImplementation(queryMock);

    SignUp(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: 'success' });
  });

  it('should return an error response if the database query fails', () => {
    const req = { body: { Username: 'testuser', Password: 'testpassword' } };
    const res = { status: jest.fn().mockReturnThis(), end: jest.fn() };
    const queryMock = jest.fn((_, callback) => {
      callback(new Error('database error'), null);
    });

    db.query.mockImplementation(queryMock);

    SignUp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.end).toHaveBeenCalled();
  });
});


