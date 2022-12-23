const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

const { protect } = require('../middleware/authMiddleware');

//Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  //check if all the fields are available
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please fill all the input fields' });
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exits' });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(404).json({ message: 'Invalid credential. User not found.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get logged in User
router.get('/loggedin', protect, (req, res) => {
  res.send(req.user);
});

//generate token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = router;
