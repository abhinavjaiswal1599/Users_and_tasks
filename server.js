// const express = require('express');
// const connectDB = require('./config/db');
// const taskRoutes = require('./routes/taskRoutes');
// const subtaskRoutes = require('./routes/subtaskRoutes');

// const app = express();

// // Connect to database
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api', taskRoutes);
// app.use('/api', subtaskRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const subtaskRoutes = require('./routes/subTaskRoutes');
const userRoutes=require('./routes/userRoutes');
const getToken = require('./middlewares/getToken'); // Include getToken module
// const express = require('express');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// const app = express();
// app.use(express.json());

const app = express();
app.use(express.json());
// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api',userRoutes);
app.use('/api', taskRoutes);
app.use('/api', subtaskRoutes);

// Example of obtaining a token
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const token = await getToken(username, password);
//     res.json({ success: true, token });
//   } catch (error) {
//     res.status(401).json({ success: false, error: 'Authentication failed' });
//   }
// });
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// app.post('/login', async (req, res) => {
//     const { username ,password} = req.body;
//     try {
//       // Authenticate user
//       const user = await User.findOne({ username ,password});
//       if (!user) {
//         return res.status(401).json({ error: 'Invalid username or password' });
//       }
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ token });
//     } catch (error) {
//       console.error('Authentication failed:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


