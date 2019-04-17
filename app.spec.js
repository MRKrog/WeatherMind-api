import request from 'supertest';
import '@babel/polyfill';
import app from './app';

describe('api', () => {

  describe('get /api/v1/weather/:lat/:long', () => {

    it('should return a 200', () => {

      request(app).get('/api/v1/weather/:lat/:long').then((res) => {
        expect(res.statusCode).toBe(200);
      });

    });

  });

});
