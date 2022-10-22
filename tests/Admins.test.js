require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Admins = db.Admins;
const Op = db.Sequelize.Op;
const request = require('supertest');

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

const Login = {
    email: process.env.LOGIN_EMAIL,
    password: process.env.LOGIN_PASSWORD
}

const email = 'mimin1@gmail.com';
    afterAll(() => {
        Admins.destroy({
          where: {
            email: email
          }
        })
      });

const Upload = './files/Untitled Diagram.drawio.png';

    describe('Admin Endpoints', () => {

        // it('POST /api/admin/register with valid values, response should be 201', async () => {
        //     jest.setTimeout(5000);
        //     const res = await request(app)
        //         .post('/api/admin/register')
        //         .field('name', 'mimin1')
        //         .field('email', 'mimin1@gmail.com')
        //         .field('password', '123456')
        //         .attach('profile', Upload)
        //         .set('Accept', 'application/json');

        //     expect(res.status).toBe(201);
        //     expect(typeof res.body.message).toMatch('string');
        // })

        // it('POST /api/admin/register with email has been ready, response should be 400', async () => {
        //     jest.setTimeout(5000)
        //     const res = await request(app)
        //         .post('/api/admin/register')
        //         .field('name', 'mimin1')
        //         .field('email', 'mimin1@gmail.com')
        //         .field('password', '123456')
        //         .attach('profile', Upload)
        //         .set('Accept', 'application/json');

        //     expect(res.status).toBe(400);
        //     expect(res.body).toHaveProperty('error.message');
        //     expect(typeof res.body.message).toBe('undefined');
        // })

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

        it('POST /api/admin/login with valid values, response should be 200', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .set('Accept', 'application/json')
                .send({
                    email: process.env.LOGIN_EMAIL,
                    password: process.env.LOGIN_PASSWORD
                })

            .expect(200);
            expect(res.body).toHaveProperty('token');
            expect(typeof res.body.token).toMatch('string');
            validToken = res.body.token;
        })

        it('POST /api/admin/login with invalid password, response should be 400', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                    email: process.env.LOGIN_EMAIL,
                    password: "invalid-password"
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it('POST /api/admin/login with invalid email, response should be 400', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                    email: "invalid-email",
                    password: process.env.LOGIN_PASSWORD
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it ('GET /api/admin/admins with valid token, response should be 200', async () => {
            const res = await request(app)
                .get('/api/admin/admins')
                .set('Accept', 'application/json')
                .set('authorization', validToken);

            expect(res.status).toEqual(200);
            expect(typeof res.body).toMatch('object');
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



