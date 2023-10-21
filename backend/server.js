const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('./secrets');
const ensureLoggedIn = require('./ensureLoggedIn');
const ensureAuth = require('./ensureAuth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin as needed
app.use(bodyParser.json());

db.connect();

// Function to get a user by username
async function getUserByUsername(username) {
  const query = 'SELECT username FROM users WHERE username = $1';
  const result = await db.query(query, [username]);
  return result.rows[0];
};

// Define routes for each table

// Users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding user to db for user signup
app.post('/api/sign-up', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

  // Insert the hashed password into the database
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error adding user', err);
      res.status(500).json({ error: 'Error adding user' });
    } else {
      console.log('User added successfully');
      res.status(201).json({ message: 'User added successfully' });
    }
  });
});

// User login and authentication
app.post('/api/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      `SELECT id, password, username FROM users WHERE username = $1`,
      [username]
    );
    const user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password) === true) {
        let token = jwt.sign({ 
          user_id: user.id, // Include user_id
          username: user.username // Include username
        }, secret);
        return res.json({ token, username });
      }
    }
    console.error("Invalid user/password", 400);
  } catch (err) {
    return next(err);
  }
});

// User Page
app.get('/api/user/:username', ensureLoggedIn, (req, res) => {
  const loggedInUsername = req.user.username; // Get the username from the JWT payload

  // Render or send data for the user's page
  const user = getUserByUsername(loggedInUsername);
  
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(200).json(user);
  }
});

// UserTechniques
app.get('/api/user-techniques', (req, res) => {
  db.query('SELECT * FROM user_techniques', (err, result) => {
    if (err) {
      console.error('Error fetching user techniques:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// UserPatterns
app.get('/api/user-patterns', (req, res) => {
  db.query('SELECT * FROM user_patterns', (err, result) => {
    if (err) {
      console.error('Error fetching user patterns:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// UserWeapons
app.get('/api/user-weapons', (req, res) => {
  db.query('SELECT * FROM user_weapons', (err, result) => {
    if (err) {
      console.error('Error fetching user weapons:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// UserForms
app.get('/api/user-forms', (req, res) => {
  db.query('SELECT * FROM user_forms', (err, result) => {
    if (err) {
      console.error('Error fetching user forms:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// UserLists
app.get('/api/user/:username/lists', ensureAuth, (req, res) => {
  const username = req.params.username;
  const user_id = req.user_id; // Get the user_id from the JWT payload

  db.query('SELECT * FROM user_lists WHERE user_id = $1', [user_id], (err, result) => {
    if (err) {
      console.error('Error fetching user lists:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Create a user list
app.post('/api/createUserList', ensureAuth, (req, res) => {
  const { list_name, list_description } = req.body;
  const user_id = req.user_id; // Get the user_id from the req object

  if (!user_id) {
    // Handle the case where the user_id is not available
    console.error('User ID not available');
    res.status(401).json({ error: 'User ID not available' });
    return;
  }

  const query = 'INSERT INTO user_lists (user_id, list_name, list_description) VALUES ($1, $2, $3)';

  db.query(query, [user_id, list_name, list_description], (err, result) => {
    if (err) {
      console.error('Error creating user list:', err);
      res.status(500).json({ error: 'Error creating user list' });
    } else {
      console.log('User list created successfully');
      res.status(201).json({ message: 'User list created successfully' });
    }
  });
});

// Route to retrieve list information by ID
app.get('/api/list/:listId', ensureAuth, async (req, res) => {
  const listId = req.params.listId; // Retrieve the list ID from the URL parameter

  try {
    // Query your PostgreSQL database to fetch the list details based on listId
    const query = 'SELECT * FROM user_lists WHERE id = $1';
    const result = await db.query(query, [listId]);

    if (result.rows.length === 0) {
      // Handle the case where the list with the specified ID is not found
      return res.status(404).json({ error: 'List not found' });
    }

    const listData = result.rows[0]; // Assuming the query returns a single row
    res.status(200).json(listData);
  } catch (error) {
    console.error('Error retrieving list:', error);
    res.status(500).json({ error: 'Error retrieving list' });
  }
});

// ListItems
app.get('/api/list-items', ensureAuth, (req, res) => {
  db.query('SELECT * FROM list_items', (err, result) => {
    if (err) {
      console.error('Error fetching list items:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding ListItems
app.post('/api/list-items', ensureAuth, (req, res) => {
  const { user_id, item_id, item_type } = req.body;
  const query = 'INSERT INTO listitems (user_id, item_id, item_type) VALUES ($1, $2, $3)';

  db.query(query, [user_id, item_id, item_type], (err, result) => {
    if (err) {
      console.error('Error adding list item', err);
      res.status(500).json({ error: 'Error adding list item'});
    } else {
      console.log('List item added successfully');
      res.status(201).json({ message: 'Item added successfully'});
    }
  });
});

// Techniques
app.get('/api/techniques', (req, res) => {
  db.query('SELECT * FROM techniques', (err, result) => {
    if (err) {
      console.error('Error fetching techniques:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding techniques
app.post('/api/techniques', (req, res) => {
  const { name, description, video_url, created_by } = req.body;
  const query = 'INSERT INTO techniques (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)';

  db.query(query, [name, description, video_url, created_by], (err, result) => {
    if (err) {
      console.error('Error adding technique', err);
      res.status(500).json({ error: 'Error adding technique'});
    } else {
      console.log('Technique added successfully');
      res.status(201).json({ message: 'Technique added successfully'});
    }
  });
});

// Patterns
app.get('/api/patterns', (req, res) => {
  db.query('SELECT * FROM patterns', (err, result) => {
    if (err) {
      console.error('Error fetching patterns:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding patterns
app.post('/api/patterns', (req, res) => {
  const {name, description, video_url, created_by} = req.body;
  const query = 'INSERT INTO patterns (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)';

  db.query(query, [name, description, video_url, created_by], (err, result) => {
    if (err) {
      console.error('Error adding pattern', err);
      res.status(500).json({ error: 'Error adding pattern'});
    } else {
      console.log('Pattern added successfully');
      res.status(201).json({ message: 'Pattern added successfully'});
    }
  });
});

// Weapons
app.get('/api/weapons', (req, res) => {
  db.query('SELECT * FROM weapons', (err, result) => {
    if (err) {
      console.error('Error fetching weapons:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding weapons
app.post('/api/weapons', (req, res) => {
  const {name, description, video_url, created_by} = req.body;
  const query = 'INSERT INTO weapons (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)';

  db.query(query, [name, description, video_url, created_by], (err, result) => {
    if (err) {
      console.error('Error adding weapon', err);
      res.status(500).json({ error: 'Error adding weapon'});
    } else {
      console.log('Weapon added successfully');
      res.status(201).json({ message: 'Weapon added successfully'});
    }
  });
});

// Forms
app.get('/api/forms', (req, res) => {
  db.query('SELECT * FROM forms', (err, result) => {
    if (err) {
      console.error('Error fetching forms:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Forms names
app.get('/api/forms/names', (req, res) => {
  db.query('SELECT id, name FROM forms', (err, result) => {
    if (err) {
      console.error('Error fetching forms names:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// Adding forms
app.post('/api/forms', (req, res) => {
  const {name, description, video_url, created_by} = req.body;
  const query = 'INSERT INTO forms (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)';

  db.query(query, [name, description, video_url, created_by], (err, result) => {
    if (err) {
      console.error('Error adding form', err);
      res.status(500).json({ error: 'Error adding form'});
    } else {
      console.log('Form added successfully');
      res.status(201).json({ message: 'Form added successfully'});
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});