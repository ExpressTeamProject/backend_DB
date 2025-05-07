const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// 테스트용 댓글 추가 API
router.post('/add-test', async (req, res) => {
  try {
    const newComment = new Comment({
      content: '테스트 댓글 내용입니다.',
      author: '6819a374fb79333845ebd38c', // 여기에 user 컬렉션의 _id를 넣으세요
      post: '6819a79ace7c82f98dc08668',   // 여기에 post 컬렉션의 _id를 넣으세요
      parent: null,
      likes: [],
      isDeleted: false
    });

    const savedComment = await newComment.save();
    res.json({ message: '테스트 댓글 추가 완료', comment: savedComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
