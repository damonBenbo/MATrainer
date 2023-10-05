const { Client } = require("pg");
const db = require('./db');

db.connect();

// Sample data for users
const usersData = [
  { username: 'test', email: 'test@test.com', password: 'password1' },
];

// Sample data for techniques
const techniquesData = [
  { name: 'Front Kick', description: 'A kick executed by lifting the knee straight forward, while keeping the foot and shin hanging freely and then straightening the leg.', video_url: 'https://youtu.be/rDAIlfTFDqU', created_by: 1 },
  { name: 'Roundhouse Kick', description: 'A kick executed by lifting the knee and then turning the supporting foot and body, then extending the leg striking with the top of the foot.', video_url: 'https://youtu.be/BZmIA4Sseco', created_by: 1 },
];

// Sample data for patterns
const patternsData = [
  { name: 'Ki Mase Punching', description: 'From ready stance, low block and then punch.', video_url: 'https://youtu.be/jq4ZcvZ0DoA', created_by: 1 },
  { name: 'Middle Block', description: 'Chamber and rotate arm to block midsection.', video_url: 'https://youtu.be/MUOwz7cHSaI', created_by: 1 },
  // Add more pattern data as needed
];

// Sample data for forms
const formsData = [
  { name: 'Wing Chun', description: 'Wing Chun is a concept-based martial art, a form of Southern Chinese kung fu, and a close-quarters system of self-defense.', video_url: 'https://youtu.be/7gFykSb1edM', created_by: 1 },
  { name: 'Taekwondo', description: 'Taekwondo is a Korean martial art involving punching and kicking techniques.', video_url: 'https://youtu.be/j6KchQAVjhI', created_by: 1 },
  // Add more form data as needed
];

// Sample data for weapons
const weaponsData = [
  { name: 'Nunchaku', description: 'Nunchaku is a traditional Asian martial arts weapon consisting of two sticks connected by a metal chain or rope.', img: 'https://www.kombativ.com/images/products/large/wooden-nunchaku-with-grip.jpg', created_by: 1 },
  { name: 'Bo Staff', description: 'A staff weapon used with both hands and varies in length depending on the form.', img: 'https://cdn11.bigcommerce.com/s-tmx09/images/stencil/338x338/products/789/1189/1903-6__67443.1521570598.jpg?c=2', created_by: 1 },
  // Add more weapon data as needed
];

// Function to insert sample data into the database
async function seedDatabase() {
    try {
      await db.query('BEGIN');
  
      // Insert data into the users table and get the generated user IDs
      const userInsertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id';
      const userResult = await db.query(userInsertQuery, [usersData[0].username, usersData[0].email, usersData[0].password]);
      const userId = userResult.rows[0].id;
  
      // Insert data into the techniques table
      for (const technique of techniquesData) {
        await db.query('INSERT INTO techniques (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [technique.name, technique.description, technique.video_url, userId]);
      }
  
      // Insert data into the patterns table
      for (const pattern of patternsData) {
        await db.query('INSERT INTO patterns (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [pattern.name, pattern.description, pattern.video_url, userId]);
      }
  
      // Insert data into the forms table
      for (const form of formsData) {
        await db.query('INSERT INTO forms (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [form.name, form.description, form.video_url, userId]);
      }
  
      // Insert data into the weapons table
      for (const weapon of weaponsData) {
        await db.query('INSERT INTO weapons (name, description, img, created_by) VALUES ($1, $2, $3, $4)', [weapon.name, weapon.description, weapon.img, userId]);
      }
  
      await db.query('COMMIT');
      console.log('Sample data inserted successfully');
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error inserting sample data:', error);
    } finally {
      db.end();
    }
  }
  
  // Call the function to seed the database
  seedDatabase();