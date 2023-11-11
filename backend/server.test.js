// Unit tests
const request = require('supertest');
const app = require('./server'); // Import your Express app

describe('Test user-related endpoints', () => {
  it('should get a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };
    const response = await request(app)
      .post('/api/sign-up')
      .send(newUser);
    expect(response.status).toBe(201);
  });

});