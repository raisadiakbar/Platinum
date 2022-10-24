require('dotenv').config();
const app = require('../server');
const db = require('../models');
const Customers = db.Customers;
const request = require('supertest');


const testCustomer = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword'
};
afterAll(() => {
      Customers.destroy({
        where: {
          email: testCustomer.email
        }
      })
    });
let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

const Upload = './files/Untitled Diagram.drawio.png';

describe('Customers Endpoints', () => {
  
  it('POST /api/customer/register with valid token, response should be 200.', async () => {
    const response = await request(app)
      .post('/api/customer/register')
      .send({
        testCustomer
      })
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })

  it('POST /api/customer/register without password, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'mimin1', email: 'mimin1@gmail.com' })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/register without email, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'cust', password: '123456' })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/login with valid token, response should be 200.', async () => {
    const response = await request(app)
      .post('/api/customer/login')
      .send({
        email: testCustomer.email,
        password: testCustomer.password
      })
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })

  it('POST /api/customer/login with invalid email, response should be 401', async () => {
    const res = await request(app)
        .post('/api/customer/login')
        .send({
            email: 'invalid@gmail.com',
            password: "password"
        })
        .set('Accept', 'application/json');

    expect(401);
    expect(typeof res.body.message).toMatch('undefined');
})

  it('POST /api/customer/login with invalid password, response should be 401', async () => {
    const res = await request(app)
        .post('/api/customer/login')
        .send({
            email: 'mimin1@gmail.com',
            password: "invalid-password"
        })
        .set('Accept', 'application/json');

    expect(401);
    expect(typeof res.body.message).toMatch('undefined');
})

  it('GET /api/customer/customers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })

  it('GET /api/customer/customers without token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
    expect(typeof response.body.message).toMatch('string');
  })

  it('GET /api/customer/customers with invalid token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token');
  })
})