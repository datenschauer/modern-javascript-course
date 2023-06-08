import request from 'supertest';
import app from './app.js';

describe('Index Route', () => {
    it('returns http response 200', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});