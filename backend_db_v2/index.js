require('dotenv').config(); // .env 불러오기
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes');  // 회원가입 api
const postRoutes = require('./routes/postRoutes');  // 게시글 작성,조회 api
const commentRoutes = require('./routes/commentRoutes');  // 댓글 작성, 조회 api

app.use(express.json()); // JSON 요청 처리
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch((err) => console.error('❌ MongoDB 연결 실패', err));

// 기본 테스트 라우터
app.get('/', (req, res) => {
  res.send('Express 서버 동작 중!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log('✅ 서버가 http://localhost:${PORT} 에서 실행 중');
});

mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose 연결됨');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose 연결 에러:', err);
});

console.log('MONGO_URI:', process.env.MONGO_URI);