const jwt = require('jsonwebtoken');
const { secret } = require('/etc/secrets/secrets');

function ensureAuth(req, res, next) {
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

    // Assuming the user ID is available in the JWT payload, you can extract it here
    if (decoded.user_id && typeof decoded.user_id !== 'undefined') {
      req.user_id = decoded.user_id; // Set the user_id in the request
    } else {
      req.user_id = null; // Set it to null if not available
    }

    next(); // Call next middleware
  });
}

module.exports = ensureAuth;