// Posts 컬렉션 수정본(25.05.12)
// 실 서비스가 아닌 '시드 기반 개발 상황'을 가정하여 수정되었습니다.


const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now }
}, { _id: false }); // 개별 첨부파일의 _id 필드 생략

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },        // 제목 최대 100자
  content: { type: String, required: true },                      // 마크다운 가능
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  categories: {
    type: [String],
    index: true,
    validate: {
      validator: arr => arr.every(v =>
        ['수학', '물리학', '화학', '생물학', '컴퓨터공학', '전자공학', '기계공학', '경영학', '경제학', '심리학', '사회학', '기타'].includes(v)
      ),
      message: '유효하지 않은 카테고리 값이 포함되어 있습니다.'
    }
  },
  tags: {
    type: [String],
    validate: [arr => arr.length <= 5, '태그는 최대 5개까지만 허용됩니다.']
  },
  // attachments의 각 항목은 파일 메타데이터로만 구성되어 있으며, 별도 참조나 관계 설정 X
  attachments: {
    type: [attachmentSchema],
    validate: [arr => arr.length <= 3, '첨부파일은 최대 3개까지만 허용됩니다.']
  },
  imageUrl: { type: String }, // 기존 필드 유지 (필요 시 제거 가능)
  viewCount: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  isSolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 기존 텍스트 인덱스 유지
postSchema.index({ title: 'text', content: 'text' });

// createdAt 내림차순 정렬용 인덱스 유지
postSchema.index({ createdAt: -1 });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
