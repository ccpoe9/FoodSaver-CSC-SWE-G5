const request = require('supertest');
const app = require('../app'); 
const db = require('../config/db.config');

describe('Favorites API', () => {
  beforeAll(async () => {
    // Connect to the test database
    await db.connect();
  });

  afterAll(async () => {
    // Disconnect from the test database
    await db.close();
  });

  describe('GET /favorites', () => {
    it('should return a list of favorites for a given customer ID', async () => {
      const customerID = 1;
      const response = await request(app).get(`/favorites?customerID=${customerID}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a 400 status code if an error occurs', async () => {
      const customerID = 'invalid';
      const response = await request(app).get(`/favorites?customerID=${customerID}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toMatch(/SQL Error/);
    });
  });

  describe('POST /favorites', () => {
    it('should add a product to the favorites list for a given customer ID', async () => {
      const customerID = 1;
      const productID = 2;
      const response = await request(app)
        .post('/favorites')
        .send({ customerID, productID });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toMatch(/successfully added/);
    });

    it('should return a 400 status code if an error occurs', async () => {
      const customerID = 'invalid';
      const productID = 2;
      const response = await request(app)
        .post('/favorites')
        .send({ customerID, productID });

      expect(response.statusCode).toBe(400);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toMatch(/SQL Error/);
    });
  });

  describe('DELETE /favorites', () => {
    it('should remove a product from the favorites list for a given customer ID', async () => {
      const customerID = 1;
      const productID = 2;
      const response = await request(app).delete(`/favorites?customerID=${customerID}&productID=${productID}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toMatch(/successfully removed/);
    });

    it('should return a 400 status code if an error occurs', async () => {
      const customerID = 'invalid';
      const productID = 2;
      const response = await request(app).delete(`/favorites?customerID=${customerID}&productID=${productID}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      expect(response.body.message).toMatch(/SQL Error/);
    });
  });
});
