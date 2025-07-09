// tests/api.test.js
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

const SECRET = 'mysecret';
const adminToken = jwt.sign({ id: 'u2', role: 'admin' }, SECRET);
const userToken = jwt.sign({ id: 'u1', role: 'user' }, SECRET);
const invalidToken = 'invalid.token';

describe('DELETE /posts/:id', () => {
  it('✅ allows admin', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });

  it('❌ blocks normal user', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('❌ blocks invalid token', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${invalidToken}`);
    expect(res.status).toBe(403);
  });
});
