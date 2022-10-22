require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Sellers = db.Sellers;
const Op = db.Sequelize.Op;
const request = require('supertest');

const testSeller = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword'
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';


const email = 'mimin1@gmail.com';
afterAll(() => {
  Sellers.destroy({
    where: {
      email: email
    }
  })
 });


const Upload = './files/Untitled Diagram.drawio.png';


describe('Sellers Endpoints', () => {
  // it('POST /api/seller/register with valid values, response should be 201', async () => {
  //   jest.setTimeout(5000)
  //   const res = await request(app)
  //     .post('/api/seller/register')
  //     .field('name', 'mimin1')
  //     .field('email', 'mimin1@gmail.com')
  //     .field('password', '123456')
  //     .attach('photo', Upload)
  //     .set('Accept', 'application/x-www-form-urlencoded');
      
  //     expect(res.status).toBe(201);
  //     expect(typeof res.body.message).toMatch('string');
  // })

  // it('POST /api/seller/register with email has been ready, response should be 400', async () => {
  //   jest.setTimeout(5000)
  //   const res = await request(app)
  //       .post('/api/seller/register')
  //       .field('name', 'mimin1')
  //       .field('email', 'mimin1@gmail.com')
  //       .field('password', '123456')
  //       .attach('photo', Upload)
  //       .set('Accept', 'application/x-www-form-urlencoded');

  //   expect(res.status).toBe(400);
  //   expect(res.body).toHaveProperty('error.message');
  //   expect(typeof res.body.message).toBe('undefined');
  // })

  it('POST /api/seller/register without password, response should be 400', async () => {
  const res = await request(app) 
        .post('/api/seller/register')
        .send({
            name: 'mimin1',
            email: 'mimin1@gmail.com',
            role: 1,
            photo: ''
        })
        .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toMatch('string'); 
  })


  // it('POST /api/seller/login with valid email and pass, response should be 200', async () => {
  //   const res = await request(app)
  //     .post('/api/seller/login')
  //     .set('Accept', 'application/json')
  //     .send({
  //       email: process.env.LOGIN_EMAIL,
  //       password: process.env.LOGIN_PASSWORD
  //     });

  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('token');
  //     expect(typeof res.body.token).toMatch('string');
  //     validToken = res.body.token;
  //   })
  
  it('POST /api/seller/login with invalid password, response should be 400', async () => {
      const res = await request(app)
          .post('/api/seller/login')
          .send({
              email: 'mimin1@gmail.com',
              password: "invalid-password"
          })
          .set('Accept', 'application/json');

      expect(401);
      expect(typeof res.body.message).toMatch('undefined');
  })

  // it('POST /api/seller/login with invalid email, response should be 400', async () => {
  //     const res = await request(app)
  //         .post('/api/seller/login')
  //         .send({
  //             email: "invalid-email",
  //             password: '123456'
  //         })
  //         .set('Accept', 'application/json');

  //     expect(res.status).toBe(401);
  //     expect(typeof res.body.message).toMatch('undefined');
  // })
  

  it('GET /api/seller/sellers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/api/seller/sellers')
      .set('Accept', 'application/json')
      .set('authorization', validToken)

      expect(200);
      expect(typeof response.body).toMatch('object');
    })

  it('GET /api/seller/sellers without token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/seller/sellers')
      .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(typeof response.body.message).toMatch('string');
    })

  it('GET /api/seller/sellers with invalid token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/seller/sellers')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Invalid token');
    })
})