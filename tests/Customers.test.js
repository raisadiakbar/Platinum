require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Customers = db.Customers;
const Op = db.Sequelize.Op;
const request = require('supertest');


const email = 'mimin1@gmail.com';
afterAll(() => {
    Customers.destroy({
      where: {
        email: email
      }
    })
});

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

const testCustomer = {
  name: 'mimin1',
  email: 'mimin1@gmail.com',
  password: '123456'
}


const Upload = './files/Untitled Diagram.drawio.png';

describe('Customers Endpoints', () => {
  // it('POST /api/customer/register with valid values, response should be 201', async () => {
  //   const res = await request(app)
  //     .post('/api/customer/register')
  //     .field('name', 'mimin1')
  //     .field('email', 'mimin1@gmail.com')
  //     .field('password', '123456')
  //     .attach('photo', Upload)
  //     .set('Accept', 'application/x-www-form-urlencoded');

  //   expect(res.status).toBe(201);
  //   expect(typeof res.body.message).toMatch('string');
  // })

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
      .send({ name: 'mimin1', password: '123456' })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/api/customer/login')
      .set('Accept', 'application/json')
      .send({
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('POST /api/customer/login with invalid email, response should be 404', async () => {
    const res = await request(app)
      .post('/api/customer/login')
      .set('Accept', 'application/json')
      .send({
        email: 'invalid-email',
        password: testCustomer.password
      });

    expect(res.status).toBe(401);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/login with invalid pass, response should be 404', async () => {
    const res = await request(app)
      .post('/api/customer/login')
      .set('Accept', 'application/json')
      .send({
        email: testCustomer.email,
        password: 'invalid-pass'
      });

    expect(res.status).toBe(401);
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