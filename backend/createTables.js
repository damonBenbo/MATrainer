const { Client } = require('pg');
const db = require('./db');

// Connect to the database
db.connect();

// Define the SQL statement to create all the tables
const createTablesQueries = [
`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS techniques (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description text NOT NULL,
    video_url text,
    created_by INTEGER REFERENCES users(id)
  )`,

  `CREATE TABLE IF NOT EXISTS patterns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description text NOT NULL,
    video_url text,
    created_by INTEGER REFERENCES users(id)
  )`,

  `CREATE TABLE IF NOT EXISTS forms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description text NOT NULL,
    video_url text,
    created_by INTEGER REFERENCES users(id)
  )`,

  `CREATE TABLE IF NOT EXISTS weapons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description text NOT NULL,
    img text,
    created_by INTEGER REFERENCES users(id)
  )`,

  `CREATE TABLE IF NOT EXISTS user_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    list_name text NOT NULL,
    list_description text NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS list_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    list_id INTEGER REFERENCES user_lists(id) ON DELETE CASCADE,
    item_name text NOT NULL,
    item_type VARCHAR(255) NOT NULL,
    notes TEXT
  )`];

// Execute the SQL statement to create all the tables
async function createTables() {
    for (const query of createTablesQueries) {
        try {
            await db.query(query);
            console.log('Table created successfully');
        } catch (err) {
            console.error('Error creating table:', err);
        }
    }
}

// Execute the createTables function to create the tables
createTables()
  .then(() => {
    // Close the database connection after all tables are created
    db.end();
  })
  .catch((error) => {
    console.error('Error:', error);
    db.end();
  });