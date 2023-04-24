const pool = require('../config/db.config');

describe('MySQL connection pool', () => {
  test('should successfully connect to the database', done => {
    pool.getConnection((err, connection) => {
      expect(err).toBeNull();
      expect(connection).toBeDefined();
      connection.release();
      done();
    });
  });
});
