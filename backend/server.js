const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

db.connect();

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

// Adding user to db
app.post('/api/users', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve the hashed password from the database
  const query = 'SELECT * FROM users WHERE email = $1';
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error('Error fetching user', err);
      res.status(500).json({ error: 'Error fetching user' });
    } else {
      if (result.rows.length === 0) {
        res.status(401).json({ error: 'User not found' });
      } else {
        const user = result.rows[0];

        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Passwords match, user is authenticated
          res.status(200).json({ message: 'Login successful' });
        } else {
          // Passwords do not match
          res.status(401).json({ error: 'Invalid password' });
        }
      }
    }
  });
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
app.get('/api/user-lists', (req, res) => {
  db.query('SELECT * FROM user_lists', (err, result) => {
    if (err) {
      console.error('Error fetching user lists:', err);
      res.status(500).send(err);
    } else {
      res.status(200).json(result.rows);
    }
  });
});

// ListItems
app.get('/api/list-items', (req, res) => {
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
app.post('/api/list-items', (req, res) => {
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