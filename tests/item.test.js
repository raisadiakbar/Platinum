require('dotenv').config();
const app = require('../server');
const db = require('../models');
const fs = require('fs');
const Items = db.Items;
const Op = db.Sequelize.Op;
const request = require('supertest');

const testItem = {
  name: 'Test',
  price: 100,
  store_name: 'Test',
  category: 'Test',
  brand: 'Test',
  status: 'ACTIVE',
};
afterAll(() => {
  Items.destroy({
        where: {
          name: testItem .name
        }
      })
    });

const newItem = {
  name: 'Test2',
  price: '200',
  store_name: 'Test2',
  category: 'Test2',
  brand: 'Test2',
};
afterAll(() => {
  Items.destroy({
        where: {
          name: newItem.name
        }
      })
    });

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

describe('Items Endpoints', () => {

  it('POST /api/item/item with valid token, response should be 200.', async () => {
    const response = await request(app)
      .post('/api/item/item')
      .send({
        testItem
      })
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(200);
    expect(typeof response.body).toMatch('object');
  })

    it('GET /api/item/items with valid token, response should be 200.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('Accept', 'application/json')
        .set('authorization', validToken);
  
      expect(200);
      expect(typeof response.body).toMatch('object');
    });

    it('GET /api/item/items without token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('Accept', 'application/json');
  
        expect(response.status).toEqual(401);
        expect(typeof response.body.message).toMatch('string');
      })
  
    it('GET /api/item/items with invalid token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('authorization', invalidToken)
        .set('Accept', 'application/json');
  
        expect(response.status).toEqual(401);
        expect(typeof response.body).toMatch('object');
        expect(response.body.message).toBe('Invalid token');
      })

        // it get invalid token
    it('GET /api/item/items/:id invalid token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items/'+process.env.ITEM_ID)
        .set('authorization', invalidToken)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(401);
        expect(typeof response.body).toMatch('object');
      })

    it('GET /api/item/items/:id without token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items/'+process.env.ITEM_ID)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(401);
        expect(typeof response.body).toMatch('object');
      })
          


      it('PUT /api/item/items with valid token, response should be 200.', async () => {
        const response = await request(app)
          .put('/api/item/items/')
          .send(newItem)
          .set('Accept', 'application/json')
          .set('authorization', validToken);
    
        expect(200);
        expect(typeof response.body).toMatch('object');
      })
  

      it('PUT /api/item/items/:id update item without token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/'+process.env.ITEM_ID)
          .send(newItem)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body.message).toMatch('string');

      })

      it('PUT /api/item/items/:id update item with invalid token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/'+process.env.ITEM_ID)
          .send(newItem)
          .set('authorization', invalidToken)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body).toMatch('object');
          expect(response.body.message).toBe('Invalid token');

      })

      it('PUT /api/item/items/delete/ with valid token, response should be 200.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/')
          .send(newItem)
          .set('Accept', 'application/json')
          .set('authorization', validToken);
    
        expect(200);
        expect(typeof response.body).toMatch('object');
      })

      it('PUT /api/item/items/delete/:id ACTICE to INACTIVE without token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/'+process.env.ITEM_ID)
          .field('status', 'INACTIVE')
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body.message).toMatch('string');
      })

      it('PUT /api/item/items/delete/:id ACTICE to INACTIVE with invalid token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/'+process.env.ITEM_ID)
          .field('status', 'INACTIVE')
          .set('authorization', invalidToken)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body).toMatch('object');
          expect(response.body.message).toBe('Invalid token');
      })
    
})

