import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/db.json`); // Use __dirname for proper path handling
const middlewares = jsonServer.defaults();

// Middleware setup
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom POST endpoint for registration
server.post('/register', async (req, res) => {
  const { username, email, dept, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !dept || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const db = router.db;
  const existingUser = db.get('users').find({ email }).value(); // Check if the user already exists

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Push the new user to 'users' array and write to db.json
  db.get('users').push({ username, email, dept, password: hashedPassword }).write();

  res.status(201).json({ message: 'User registered successfully!' });
});

// Custom POST endpoint for login
server.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const db = router.db;
  const user = db.get('users').find({ email }).value(); // Find user by email

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials!' });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials!' });
  }

  // Omit the password from the user data
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({ message: 'Login successful!', user: userWithoutPassword });
});

// Use default router to handle other routes (GET, PUT, DELETE for db.json)
server.use(router);

// Start the server
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
