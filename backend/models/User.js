const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  studentId: String,
  image: String,
  password: String,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
