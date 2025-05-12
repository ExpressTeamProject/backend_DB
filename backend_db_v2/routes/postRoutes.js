// 각 기능별 API(게시글 업로드) - 임시 API 핸들링 코드입니다.
// 수정본(25.05.12)

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/add-test', async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      categories,
      tags,
      isSolved,
      attachments
    } = req.body;

    const newPost = new Post({
      title,
      content,
      author,
      categories,
      tags,
      isSolved: isSolved || false,
      attachments // 첨부파일 정보
    });

    const savedPost = await newPost.save();
    res.status(201).json({ message: '게시글 추가 완료', post: savedPost });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
