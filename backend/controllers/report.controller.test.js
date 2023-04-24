const request = require('supertest');
const app = require('../app'); 
const db = require('../config/db.config');

describe('Report API', () => {
  describe('GET /reports', () => {
    it('should return an array of reports', async () => {
      const response = await request(app).get('/reports?customerID=123');
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a 400 status code if the query parameter is missing', async () => {
      const response = await request(app).get('/reports');
      expect(response.status).toEqual(400);
    });
  });

  describe('GET /admin-reports', () => {
    it('should return an array of reports', async () => {
      const response = await request(app).get('/admin-reports?supplierID=456');
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a 400 status code if the query parameter is missing', async () => {
      const response = await request(app).get('/admin-reports');
      expect(response.status).toEqual(400);
    });
  });

  describe('POST /reports', () => {
    beforeAll(() => {
      jest.spyOn(db, 'query').mockImplementation((query, callback) => {
        callback(null, [{ message: 'Success' }], null);
      });
    });

    afterAll(() => {
      db.query.mockRestore();
    });

    it('should create a new report and return a success message', async () => {
      const response = await request(app)
        .post('/reports')
        .send({
          Title: 'New Report',
          Desc: 'Description of the new report',
          storeName: 'Store XYZ',
          customerID: 789,
        });
      expect(response.status).toEqual(200);
      expect(response.body[0].message).toEqual('Success');
    });

    it('should return a 400 status code if the request body is invalid', async () => {
      const response = await request(app).post('/reports').send({});
      expect(response.status).toEqual(400);
    });
  });
});
