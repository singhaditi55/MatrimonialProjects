const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/matrimonial_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  caste: String,
  subCaste: String,
  location: String,
  education: String,
  occupation: String,
  avatar: String,
  interests: [String],
  phone: String,
  email: String
});

const Profile = mongoose.model('Profile', profileSchema);

// Routes
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/profiles', async (req, res) => {
  const profile = new Profile(req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
