
// 각 기능별 API(회원가입) - 임시 API코드입니다.

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 회원가입 (테스트용)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, nickname } = req.body;
    const user = new User({ username, email, password, nickname });
    await user.save();
    res.status(201).json({ message: '회원가입 성공', user });
  } catch (err) {
    res.status(400).json({ message: '회원가입 실패', error: err.message });
  }
});

// 사용자 목록 (테스트용)
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;

 