// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = 3000; // Or any other port you prefer
// const HOST = '0.0.0.0'; // This will bind the server to all available network interfaces

// // Use the CORS middleware
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, HOST, () => {
//   console.log(`Server running at http://${HOST}:${PORT}/`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;
// const HOST = '0.0.0.0'; // This will bind the server to all available network interfaces

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Dummy database for storing user information (replace this with a real database)
const users = [
  { id: 1, email: 'xx@gmail.com', password: '12345678' }
];

// Login endpoint
app.post('/login', (req, res) => {
    setTimeout(function() {
        console.log("timeout")
     const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  } 
}, 3000)

});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    res.status(409).json({ message: 'Email already exists' });
  } else {
    const newUser = { id: users.length + 1, email, password };
    users.push(newUser);
    res.status(201).json({ message: 'Signup successful', newUser });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
