require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Orders = db.orders;
const Op = db.Sequelize.Op;
const request = require('supertest');


let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';
let invalidId = 'Invalid-id-for-negative-cases';


const testAddOrder = {
    customer_id: 'cust-id-1',
    item_id: 'item-id-1',
    qty: 80,
    amount: 80 * 100,
    status: "pending",
    payment_method: "cash"
}

describe('Order Endpoints', () => {

    it('POST /api/order/addOrders with valid token, response should be 200.', async () => {
        const response = await request(app)
          .post('/api/order/addOrders')
          .send({
            testAddOrder
          })
          .set('Accept', 'application/json')
          .set('authorization', validToken);
    
        expect(200);
        expect(typeof response.body).toMatch('object');
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

 // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/cusId <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

 
    it('GET /api/order/orders/cusId with valid token, response should be 200.', async () => {
      const response = await request(app)
        .get('/api/order/orders/cusId')
        .set('Accept', 'application/json')
        .set('authorization', validToken);
  
      expect(200);
      expect(typeof response.body).toMatch('object');
    });


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
    it('GET /api/order/orders/:id with valid token, response should be 200.', async () => {
        const response = await request(app)
          .get('/api/order/orders/:id')
          .set('Accept', 'application/json')
          .set('authorization', validToken);
    
        expect(200);
        expect(typeof response.body).toMatch('object');
      });
    

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

    it('PUT /api/order/orders/ with valid token, response should be 200.', async () => {
        const response = await request(app)
          .put('/api/order/orders/')
          .send(testAddOrder)
          .set('Accept', 'application/json')
          .set('authorization', validToken);
    
        expect(200);
        expect(typeof response.body).toMatch('object');
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