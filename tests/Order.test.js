require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Items = db.items;
const Orders = db.orders;
const Op = db.Sequelize.Op;
const request = require('supertest');


let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';
let invalidId = 'Invalid-id-for-negative-cases';


const testAddOrder = {
    customer_id: process.env.CUSTOMER_ID,
    item_id: process.env.ITEM_ID,
    qty: 80,
    amount: 80 * 100,
    status: "pending",
    payment_method: "cash"
}

describe('Order Endpoints', () => {
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

    it('POST /api/order/addOrders with valid values, response should be 201', async () => {
        jest.setTimeout(5000);
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')
            .set('authorization', validToken)

        expect(res.status).toBe(201)
        expect(typeof res.body).toMatch('object')
        
    })

    it('POST /api/order/addOrders with invalid token, response should be 401', async () => {
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty('message');
        expect(typeof res.body.message).toBe('string');
    })

    it('POST /api/order/addOrders with without token, response should be 401', async () => {
        const res = await request(app)
            .post('/api/order/addOrders')
            .send(testAddOrder)
            .set('Accept', 'application/json')

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POST /api/order/addOrders<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // it('POST /api/order/addOrders invalid customer_id, response should be 404', async () => {
    //     const res = await request(app)
    //         .post('/api/order/addOrders')
    //         .send({
    //             customer_id: 'invalid-customer-id',
    //             item_id: 'a42334ab-46b0-4bbd-ad2d-e1a3571fff4a',
    //             qty: 80,
    //             amount: 64000,
    //             status: "pending",
    //             payment_method: "cash"
    //         })
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)
            
    //     expect(res.status).toEqual(401);
    //     expect(res.body).toHaveProperty('message');
    //     expect(typeof res.body.message).toBe('string');
    // })

    // it('POST /api/order/addOrders invalid item_id, response should be 401', async () => {
    //     const res = await request(app)
    //         .post('/api/order/addOrders')
    //         .set('Accept', 'application/x-www-form-urlencoded')
    //         .set('authorization', validToken)
    //         .send({
    //             customer_id: '19531131-13d2-40fb-b4f6-8e09649e598b',
    //             item_id: 'invalid-item-id',
    //             qty: 80,
    //             amount: 64000,
    //             status: "pending",
    //             payment_method: "cash"
    //         })

    //     expect(res.status).toEqual(401);
    //     expect(res.body).toHaveProperty('message');
    //     expect(typeof res.body.message).toBe('string');
    // })

 // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/cusId <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

 it('GET /api/order/orders/cusId with valid customer_id, response should be 200', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('authorization', validToken)
            .query({
                customer_id: process.env.CUSTOMER_ID
            })

        expect(res.status).toEqual(200);
        expect(typeof res.body).toMatch('object');
    }),


    it('GET /api/order/orders/cusId with invalid token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('authorization', invalidToken)
            .query({
                customer_id: process.env.CUSTOMER_ID
            })

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })

    it('GET /api/order/orders/cusId with without token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/cusId')
            .set('Accept', 'application/x-www-form-urlencoded')
            .query({
                customer_id: process.env.CUSTOMER_ID
            })

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toMatch('string');
    })

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/:id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    it('GET /api/order/orders/:id with valid token, response should be 200', async () => {
        const res = await request(app)
        .get('/api/order/orders/'+process.env.ORDER_ID)
        .set('Accept', 'application/json')
            .set('authorization', validToken)
            .expect(200);

        expect(res.body).toHaveProperty(
            'id',
            'customer_id',
            'item_id',
            'qty',
            'amount',
            'status',
            'payment_method'
        );
    })
    

    it('GET /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/'+process.env.ORDER_ID)
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    it('GET /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .get('/api/order/orders/'+process.env.ORDER_ID)
            .set('Accept', 'application/json')

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    // it('GET /api/order/orders/:id with wrong id, response should be 404', async () => {
    //     const res = await request(app)
    //         .get('/api/order/orders/:id')
    //         .send({
    //             id: invalidId
    //         })
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)


    //     expect(res.status).toBe(401);
    //     expect(res.body).toHaveProperty('message');
    // })

    it('PUT /api/order/orders/:id with valid token, response should be 203', async () => {
        const res = await request(app)
            .put('/api/order/orders/'+process.env.ORDER_ID)
            .send({
                customer_id   : process.env.CUSTOMER_ID,
                item_id       : process.env.ITEM_ID,
                qty           : 11,
                amount        : 11 * 8000,
                status        : "approved",
                payment_method: "credit"
            })
            .set('Accept', 'application/json')
            .set('authorization', validToken)

        expect(res.status).toBe(203);
        expect(res.body).toHaveProperty('message');
    })

    it('PUT /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .put('/api/order/orders/'+process.env.ORDER_ID)
            .send({
                customer_id   : process.env.CUSTOMER_ID,
                item_id       : process.env.ITEM_ID,
                qty           : 11,
                amount        : 11 * 8000,
                status        : "pending",
                payment_method: "Pay Pal"
            })
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message');
    })

    it('PUT /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .put('/api/order/orders/'+process.env.ORDER_ID)
            .send({
                customer_id   : process.env.CUSTOMER_ID,
                item_id       : process.env.ITEM_ID,
                qty           : 11,
                amount        : 11 * 8000,
                status        : "pending",
                payment_method: "Pay Pal"
            })
            .set('Accept', 'application/json')
            .expect(401);
    })

    // it('DELETE /api/order/orders/:id with valid token, response should be 200', async () => {
    //     const res = await request(app)
    //         .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
    //         .set('Accept', 'application/json')
    //         .set('authorization', validToken)
    //         .expect(200);

    //     expect(res.body).toHaveProperty('message');
    // })

    it('DELETE /api/order/orders/:id with invalid token, response should be 401', async () => {
        const res = await request(app)
            .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
            .set('Accept', 'application/json')
            .set('authorization', invalidToken)
            .expect(401);

        expect(res.body).toHaveProperty('message');
    })

    it('DELETE /api/order/orders/:id with without token, response should be 401', async () => {
        const res = await request(app)
            .delete('/api/order/orders/107cba25-0db8-4dfe-a7ca-3ccd32f4303f')
            .set('Accept', 'application/json')
            .expect(401);

        expect(res.body).toHaveProperty('message');
    })
})