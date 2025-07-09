// server.js
const app = require('./app');
const { connectToDB } = require('./db');

const PORT = 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
