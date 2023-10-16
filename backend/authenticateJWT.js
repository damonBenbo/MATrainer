const jwt = require('jsonwebtoken');
const secret = 'your-secret-key'; // Replace with your actual secret key

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(403); // Forbidden
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user; // Set the user data in the request
    next(); // Proceed to the next middleware or route
  });
}

module.exports = authenticateJWT;