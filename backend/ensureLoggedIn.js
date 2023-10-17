const jwt = require('jsonwebtoken');
const { secret } = require('./secrets');

function ensureLoggedIn(req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Split the header into "Bearer" and the token itself
  const tokenParts = authHeader.split(' ');
  
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = tokenParts[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decoded;
    console.log('Decoded User:', req.user);

    const requestedUsername = req.params.username;

    if (req.user.username === requestedUsername) {
      return next();
    } else {
      console.error('Username mismatch:', req.user.username, requestedUsername);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });
}

module.exports = ensureLoggedIn;