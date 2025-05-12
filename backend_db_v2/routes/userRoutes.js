// 각 기능별 API(회원가입) - 임시 API 핸들링 코드입니다.
// 수정본(25.05.12)

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// 회원가입 (테스트용)
router.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      nickname,
      bio,
      major,
      website,
      socialLinks
    } = req.body;

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새 사용자 생성
    const user = new User({
      username,
      email,
      password: hashedPassword,
      nickname,
      bio,
      major,
      website,
      socialLinks
    });

    await user.save();

    // 비밀번호 제외 후 응답
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ message: '회원가입 성공', user: userObj });
  } catch (err) {
    res.status(400).json({ message: '회원가입 실패', error: err.message });
  }
});

// 사용자 목록 (테스트용)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // 비밀번호 제외하고 조회
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: '사용자 목록 조회 실패', error: err.message });
  }
});

module.exports = router;


 