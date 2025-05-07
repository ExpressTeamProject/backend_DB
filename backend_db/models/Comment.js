
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },  // 단일 인덱스
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', index: true },   // 단일 인덱스
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', index: true }, // 단일 인덱스
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
