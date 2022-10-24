require('dotenv').config();
const app = require('../server');
const db = require('../models');
const Admins = db.Admins;
const request = require('supertest');

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

const testAdmins = {
    name: 'Tester',
    email: 'test@mail.com',
    password: 'TestPassword'
  };
 afterAll(() => {
        Admins.destroy({
          where: {
            email: testAdmins.email
          }
        })
      });

const Upload = './files/Untitled Diagram.drawio.png';

    describe('Admin Endpoints', () => {

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
                    name: 'test01',
                    email: 'test01@gmail.com',
                    role: 1,
                    profile: ''
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
                    email: 'mimin1@gmail.com',
                    password: "invalid-password"
                })
                .set('Accept', 'application/json');
        
            expect(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it('POST /api/admin/login with invalid email, response should be 401', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                    email: 'invalid@gmail.com',
                    password: "password"
                })
                .set('Accept', 'application/json');
        
            expect(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

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
    })



