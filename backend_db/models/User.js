
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // unique 인덱스
  email: { type: String, required: true, unique: true },     // unique 인덱스
  password: { type: String, required: true },
  nickname: { type: String },
  profileImage: { type: String },
  role: { type: String, default: 'user' },
  resetPasswordToken: { type: String, index: true }, // 단일 인덱스
  resetPasswordExpire: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

