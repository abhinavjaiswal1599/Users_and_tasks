
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const subtaskRoutes = require('./routes/subTaskRoutes');
const userRoutes=require('./routes/userRoutes');
const getToken = require('./middlewares/getToken'); 
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const app = express();
app.use(express.json());
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api',userRoutes);
app.use('/api', taskRoutes);
app.use('/api', subtaskRoutes);


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
  
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


