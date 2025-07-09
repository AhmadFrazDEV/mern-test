// app.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authorize = require('./middleware');
const { getDB } = require('./db');

const SECRET = 'mysecret';
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


// Hardcoded users
const users = {
  u1: { id: 'u1', role: 'user' },
  u2: { id: 'u2', role: 'admin' }
};

app.all('/', (req, res) => {
  res.send('✅ API is running. Use POST /login, GET /feed, etc.');
});


// POST /login
app.post('/login', (req, res) => {
  const { id } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Missing user ID' });

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
  const page = parseInt(req.query.page || '0', 10);
  const perPage = 10;

  try {
    const db = getDB();

    // Step 1: Get current user's followings from users collection
    const user = await db.collection('users').findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followings = user.following || [];

    console.log(`👥 ${req.user.id} follows:`, followings);

    if (followings.length === 0) {
      return res.json([]); // No followings = no feed
    }

    // Step 2: Get posts from followings
    const posts = await db.collection('post')
      .find({ author: { $in: followings } })
      .sort({ created: -1 })
      .skip(page * perPage)
      .limit(perPage)
      .toArray();

    res.json(posts);
  } catch (err) {
    console.error('❌ Feed error:', err.message);
    res.status(500).json({ error: 'Failed to load feed' });
  }
});


module.exports = app;
