// Unit tests
const request = require('supertest');
const app = require('./server');

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

  it('should log in an existing user', async () => {
    const userCredentials = {
      username: 'testuser',
      password: 'testpassword',
    };
    const response = await request(app)
      .post('/api/login')
      .send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should fail to log in with incorrect credentials', async () => {
    const userCredentials = {
      username: 'testuser',
      password: 'incorrectpassword',
    };
    const response = await request(app)
      .post('/api/login')
      .send(userCredentials);
    expect(response.status).toBe(400);
  });

});