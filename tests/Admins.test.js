require('dotenv').config();
const app = require('../server');
const db = require('../models');
const Admins = db.Admins;
const fs = require('fs');
const Op = db.Sequelize.Op;
const request = require('supertest');


const testAdmins = {
    name: 'Tester',
    email: 'test@mail.com',
    password: 'TestPassword',
    profile: 'Diagram.drawio.png'
  };
 afterAll(() => {
        Admins.destroy({
          where: {
            email: testAdmins.email
          }
        })
      });

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

describe('Admin Endpoints', () => {

 it('GET /api/admin/admins with valid token, response should be 200.', async () => {
  const response = await request(app)
    .get('/api/admin/admins')
    .set('Accept', 'application/json')
    .set('authorization', validToken);

  expect(200);
  expect(typeof response.body).toMatch('object');
})

    it ('GET /api/admin/admins with invalid token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/admin/admins')
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('message');
        expect(typeof res.body.message).toBe('string');
    })

    it('GET /api/admin/admins with without token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/admin/admins')
            .set('Accept', 'application/json')

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })

      it('POST /api/admin/register with valid token, response should be 200.', async () => {
        const response = await request(app)
          .post('/api/admin/register')
          .send({
            testAdmins 
          })
          .set('Accept', 'application/json')
          .set('authorization', validToken);
        expect(200);
        expect(typeof response.body).toMatch('object');
      })

        it('POST /api/admin/register without password, response should be 400', async () => {
            const res = await request(app) 
                .post('/api/admin/register')
                .send({
                    name: testAdmins.name,
                    email: testAdmins.email
                })
                .set('Accept', 'application/json');
            expect(res.status).toBe(400);
            expect(typeof res.body.message).toMatch('string'); 
        })

        it('POST /api/admin/login with valid token, response should be 200.', async () => {
          const response = await request(app)
            .post('/api/admin/login')
            .send({
              email: testAdmins.email,
              password: testAdmins.password
            })
            .set('Accept', 'application/json')
            .set('authorization', validToken);
      
          expect(200);
          expect(typeof response.body).toMatch('object');
        })

        it('POST /api/admin/login with invalid password, response should be 401', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                  email: testAdmins.email,
                  password: 'belgedes'
                })
                .set('Accept', 'application/json');
        
            expect(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it('POST /api/admin/login with invalid email, response should be 401', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                  email: 'belgedes',
                  password: testAdmins.password
                })
                .set('Accept', 'application/json');
        
            expect(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

    })

