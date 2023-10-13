const { Client } = require('pg');
const {password} = require('./secrets');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'MATrainer',
  password: password, // Replace with your actual password
  port: 5432,
});

module.exports = client;