// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authorize = require('./middleware');
const { getDB } = require('./db');

const SECRET = 'mysecret';
const app = express();
app.use(express.json());

// Hardcoded users
const users = {
  u1: { id: 'u1', role: 'user' },
  u2: { id: 'u2', role: 'admin' }
};

// POST /login
app.post('/login', (req, res) => {
  const { id } = req.body;
  const user = users[id];
  if (!user) return res.status(401).json({ error: 'Invalid user' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
  res.json({ token });
});

// DELETE /posts/:id (Admin only)
app.delete('/posts/:id', authorize(['admin']), (req, res) => {
  res.json({ message: `Post ${req.params.id} deleted.` });
});

// GET /feed (User or Admin)
app.get('/feed', authorize(['user', 'admin']), async (req, res) => {
  const page = parseInt(req.query.page || 0);
  const perPage = 10;

  try {
    const db = getDB();
    const posts = await db.collection('posts')
      .find({})
      .sort({ created: -1 })
      .skip(page * perPage)
      .limit(perPage)
      .toArray();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load feed' });
  }
});

module.exports = app;
