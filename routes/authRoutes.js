//authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    await authController.signup(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route to fetch user data by email
router.get('/user', async (req, res) => {
  try {
    await authController.getUserByEmail(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to update user profile data
router.put('/user/:email', async (req, res) => {
  try {
    await authController.editUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
