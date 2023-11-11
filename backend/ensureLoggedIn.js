const jwt = require('jsonwebtoken');
const { secret } = require('/etc/secrets/secrets');

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

    // Check if the requested username matches the logged-in user's username
    if (req.user.username === req.params.username) {
      return next(); // User is authorized, proceed to the route
    } else {
      console.error('Username mismatch:', req.user.username, req.params.username);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });
}

module.exports = ensureLoggedIn;