require('dotenv').config();
const app = require('../server');
const db = require('../models');
const Sellers = db.Sellers;
const request = require('supertest');

const testSellers = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword',
  photo: 'Diagram.drawio.png'
};
// afterAll(() => {
//   Sellers.destroy({
//         where: {
//           email: testSellers.email
//         }
//       })
//     });

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';


describe('Sellers Endpoints', () => {

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

  it('POST /api/seller/register with valid token, response should be 200.', async () => {
    const response = await request(app)
      .post('/api/seller/register')
      .send({
        testSellers
      })
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })


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


  it('POST /api/seller/login with valid token, response should be 200.', async () => {
    const response = await request(app)
      .post('/api/seller/login')
      .send({
        email: testSellers.email,
        password: testSellers.password
      })
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })
  
  it('POST /api/seller/login with invalid password, response should be 401', async () => {
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

  it('POST /api/seller/login with invalid email, response should be 401', async () => {
    const res = await request(app)
        .post('/api/seller/login')
        .send({
            email: 'invalid@gmail.com',
            password: "password"
        })
        .set('Accept', 'application/json');

    expect(401);
    expect(typeof res.body.message).toMatch('undefined');
})

})