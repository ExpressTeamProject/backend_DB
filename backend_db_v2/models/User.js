// User 컬렉션 수정본(25.05.12)

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // unique 인덱스
  email: { type: String, required: true, unique: true },     // unique 인덱스
  password: { type: String, required: true },                // 해싱된 비밀번호
  nickname: { type: String },                                // 표시 이름
  profileImage: { type: String },                            // 프로필 이미지 경로
  bio: { type: String, maxlength: 500 },                     // 자기소개 (최대 500자)
  major: {                                                  // 전공 분야 (enum)
    type: String,
    enum: [
      '수학', '물리학', '화학', '생물학',
      '컴퓨터공학', '전자공학', '기계공학',
      '경영학', '경제학', '심리학', '사회학', '기타'
    ]
  },
  website: { type: String },                                 // 개인 웹사이트 URL
  socialLinks: {                                             // 소셜 링크
    github: { type: String },
    twitter: { type: String }
  },
  role: { type: String, default: 'user' },                   // 사용자 권한
  resetPasswordToken: { type: String, index: true },         // 단일 인덱스
  resetPasswordExpire: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

