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

module.exports = router;
