// Comments 컬렉션 수정본(25.05.12)

const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now }
}, { _id: false }); // 개별 첨부파일 문서에 _id 생략

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 500 },   // 댓글 최대 500자 제한
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },  // 인덱스 유지
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', index: true },    // 인덱스 유지
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', index: true }, // 인덱스 유지 (대댓글)
  attachments: {
    type: [attachmentSchema],
    validate: [arr => arr.length <= 2, '첨부파일은 최대 2개까지만 허용됩니다.']
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
