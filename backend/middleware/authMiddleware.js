const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: id }).select('-password');

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { protect };
