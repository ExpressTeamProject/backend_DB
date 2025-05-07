const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/add-test', async (req, res) => {
  try {
    const newPost = new Post({
      title: '테스트 게시글 제목',
      content: '테스트 게시글 내용입니다.',
      author: '6819a374fb79333845ebd38c',
      categories: ['테스트'],
      tags: ['tag1', 'tag2'],
      isSolved: false
    });

    const savedPost = await newPost.save();
    res.json({ message: '테스트 게시글 추가 완료', post: savedPost });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
