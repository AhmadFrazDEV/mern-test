const jwt = require('jsonwebtoken');
const SECRET = 'mysecret';

function authorize(roles = []) {
  return (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(403).json({ error: 'Missing token' });

    const token = auth.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };
}

module.exports = authorize;
