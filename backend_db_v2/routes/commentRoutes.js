// 각 기능별 API(댓글등록) - 임시 API 핸들링 코드입니다.
// 수정본(25.05.12)

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// 댓글 추가 API (테스트용)
router.post('/add-test', async (req, res) => {
  try {
    const {
      content,
      author,
      post,
      parent,
      attachments
    } = req.body;

    const newComment = new Comment({
      content,
      author,
      post,
      parent: parent || null,
      attachments: attachments || [],
      likes: [],
      isDeleted: false
    });

    const savedComment = await newComment.save();
    res.status(201).json({ message: '댓글 추가 완료', comment: savedComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
