const app = require('../index');
const request = require('supertest');
const { User } = require('../models');

const testUser = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword'
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

afterAll(() => {
  User.destroy({
    where: {
      email: testUser.email
    }
  })
});

describe('Admin Endpoints', () => {
  it('POST /admin/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/admin/register')
      .send(testUser)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /admin/register without password, response should be 400', async () => {
    const res = await request(app)
      .post('/admin/register')
      .send({ name: 'Test invalid', email: 'test@invalid.com' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /admin/register without email, response should be 400', async () => {
    const res = await request(app)
      .post('/admin/register')
      .send({ name: 'Test invalid', pass: 'pass' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /admin/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/admin/login')
      .set('Accept', 'application/json')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('GET /admin with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/admin')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('list');
  })

  it('GET /admin without token, response should be 401.', async () => {
    const response = await request(app)
      .get('/admin')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
    expect(typeof response.body.message).toMatch('string');
  })

  it('GET /admin with invalid token, response should be 400.', async () => {
    const response = await request(app)
      .get('/admin')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token invalid. Try to logout and login again.');
  })
})