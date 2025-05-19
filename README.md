---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---


---

## [목차]

1. MongoDB란?
2. MongoDB의 주요 특징
3. MongoDB를 선택한 이유
4. 핵심 용어 정리
5. DB생성 및 구축 과정
6. Postman을 활용한 MongoDB 요청 테스트

---

## [MongoDB란?]

## MongoDB  
**현대 데이터베이스의 혁신**

- 2009년 출시된 **문서 지향적 NoSQL 데이터베이스**
- **JSON 형태(BSON)**로 데이터를 저장하고 관리할 수 있음
- **컬렉션(Collection)** 단위로 데이터를 저장

<br><br><br>

## [MongoDB의 주요 특징]

1. **문서 지향적 구조**
   - 관련 데이터를 단일 문서로 저장하여 **조인 연산 불필요**.

2. **수평적 확장성**
   - **샤딩(Sharding)** 기능을 통해 여러 서버에 데이터를 **분산 저장**가능.

3. **높은 가용성**
   - **복제(Replication)** 기능을 활용하여 시스템 장애 시에도 **서비스 운영이 가능**.

4. **유연한 스키마**
   - 개발 과정에서 **데이터 모델을 쉽게 변경**할 수 있어 **빠른 개발과 유지보수**가 용이.

<br><br><br>

## [MongoDB를 선택한 이유]

1. **빠른 개발 주기**
   - 유연한 스키마 덕분에 **신속한 개발 및 반복적인 수정이 용이**.

2. **확장성**
   - **대용량 데이터 처리에 최적화**되어 있으며, 수평 확장이 가능.

3. **JSON 기반 구조**
   - **프론트엔드와 백엔드 간 데이터 교환이 효율적**.  
   - BSON(Binary JSON) 형태로 저장되어 높은 처리 성능.

4. **클라우드 지원**
   - MongoDB Atlas 등 클라우드 서비스를 통해 **인프라 관리 부담의 감소**.

<br><br><br>

## [핵심 용어 정리]

### Database
- 여러 개의 **컬렉션(Collection)**을 모아놓은 공간
- 예시: `학교DB`, `쇼핑몰DB`

### Collection
- 관련된 **문서(Document)**들의 묶음
- SQL의 **테이블(Table)**과 유사한 역할
- 예시: `학생정보`, `주문내역`

### Document
- 실제로 저장되는 **데이터의 한 건 단위**
- **JSON과 유사한 형태**로 구성됨

### Field
- 문서 내 하나의 **데이터 항목**
- 예시: `name`, `age`, `major`

### ObjectId
- 각 문서의 기본 키 역할을 하는 **`_id` 필드**
- MongoDB가 **자동으로 부여하는 고유 식별자**

### Index
- **검색 속도를 향상**시키는 데이터베이스의 기능
- 자주 조회되는 필드에 설정하여 성능 개선

### Schema
- 문서에 저장되는 데이터의 **구조와 규칙을 정의**
- Mongoose 같은 ODM에서 주로 사용

<br><br><br>

## [DB생성 및 구축 과정]

### (DB 컬렉션 구조)
```
my_db/                             # MongoDB 데이터베이스
├── users/                         # 사용자 컬렉션
│   ├── username (unique index)   # 고유 사용자 이름
│   ├── email (unique index)      # 고유 이메일 주소
│   ├── resetPasswordToken (index)# 비밀번호 재설정 토큰
│   └── createdAt                 # 생성일자 (기본값: 현재 시간)
│
├── posts/                         # 게시글 컬렉션
│   ├── title (text index)        # 제목 (최대 100자)
│   ├── content (text index)      # 본문 (마크다운 가능)
│   ├── categories (indexed)      # 카테고리 (유효성 검사 포함)
│   ├── createdAt (-1 index)      # 작성일자 (내림차순 정렬용 인덱스)
│   ├── author (ref: users)       # 작성자 참조
│   ├── tags (최대 5개)           # 태그 리스트
│   ├── attachments (최대 3개)    # 첨부파일 메타데이터 배열
│   ├── likes (ref: users)        # 좋아요 누른 사용자 목록
│   ├── comments (ref: comments)  # 댓글 ID 목록
│   └── isSolved (Boolean)        # 해결 여부 표시
│
├── comments/                      # 댓글 컬렉션
│   ├── content (maxLength: 500)  # 댓글 내용
│   ├── author (ref: users, index)# 작성자 참조
│   ├── post (ref: posts, index)  # 연결된 게시글
│   ├── parent (ref: comments)    # 대댓글 참조
│   ├── attachments (최대 2개)    # 첨부파일 배열
│   ├── likes (ref: users)        # 좋아요 누른 사용자
│   ├── isDeleted (Boolean)       # 삭제 여부
│   └── createdAt                 # 생성일자
│
├── articles/                      # 커뮤니티 게시글 컬렉션
│   ├── title (text index)        # 제목 (필수, 최대 100자)
│   ├── content (text index)      # 본문 내용 (필수)
│   ├── author (ref: users)       # 작성자 참조 (필수)
│   ├── category (enum, index)    # 카테고리 (기타 포함 5가지)
│   ├── tags (최대 5개, index)    # 태그 배열
│   ├── attachments (무제한)      # 첨부파일 배열 (메타정보 포함)
│   ├── viewCount (default: 0)    # 조회수
│   ├── likes (ref: users)        # 좋아요 누른 사용자 목록
│   ├── comments (ref: comments)  # 댓글 목록
│   ├── likeCount (virtual)       # 좋아요 수 (가상 필드)
│   ├── commentCount (virtual)    # 댓글 수 (가상 필드)
│   ├── createdAt (-1 index)      # 작성일자 (인덱스 포함)
│   └── updatedAt                 # 수정일자 (자동 생성)

```

<br><br><br>

### (MongoDB Atlas 계정 생성 및 Cluster생성)
#### Atlas란?

**MongoDB에서 제공하는 클라우드 기반 데이터베이스 서비스**

- AWS, Google Cloud, Azure 환경 위에 MongoDB를 손쉽게 설치 및 운영 가능
- 개발자가 직접 서버를 설치하거나 유지보수할 필요 없이, **몇 번의 클릭만으로 데이터베이스 생성 및 관리 가능**

---

##### 주요 특징

- **강력한 보안** 및 백업 기능 제공
- **모니터링**, **성능 분석**, **알림 시스템** 내장
- **자동 확장성 지원**으로 데이터 증가에 유연하게 대응
- **실시간 성능 상태 관리** 가능

---

##### 진행 단계

1. [ ] Atlas에 계정 생성 및 등록
2. [ ] 무료 요금제를 선택하여 클러스터 생성
3. [ ] 보안 설정 및 네트워크 접근 허용
4. [ ] 데이터베이스 생성 후 클라이언트에서 연결

---

##### 클러스터란?

> **하나 이상의 서버(노드)**로 구성된 MongoDB 데이터베이스 그룹

##### 클러스터의 핵심 역할
- **데이터 복제**: 데이터 손실 방지 및 장애 복구
- **수평 확장**: 샤딩을 통해 대규모 데이터 처리 가능
- **고가용성 보장**: 여러 노드 중 하나가 장애 나더라도 운영 지속 가능

<br><br><br>

### (Cluster연결용 문자열 확인 및 기본 설정-1)
#### 진행단계
1. **클러스터 연결 문자열(URI) 생성**
   - MongoDB에 접속하기 위한 **URI 문자열**을 생성.
   - 해당 문자열에는 **접속용 사용자 이름과 비밀번호**가 포함.
   - Ex. `mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase`

2. **Database Access 설정**
   - MongoDB에 접속할 수 있는 **사용자(DB User)**를 생성.
   - 역할(Role): 일반적으로 **읽기/쓰기(Read/Write)** 권한 부여.

3. **Network Access 설정**
   - 클러스터에 접근할 수 있는 **IP 주소 또는 IP 범위**를 등록.

<br><br><br>

### (Cluster연결용 문자열 확인 및 기본 설정-2)
#### 진행단계
- Database Access 및 Network Access 설정

1. **Database Access 설정**
   - MongoDB 접속을 위한 **사용자 계정(DB User)**을 생성.
   - 역할(Role): `admin` 권한 부여  
     > 모든 데이터베이스에 대한 전체 권한을 가지는 관리자 계정.

2. **Network Access 설정**
   - 클러스터에 접근할 수 있는 **IP 주소 또는 IP 범위**를 등록.
   - 개발 환경에서는 다음과 같이 설정 가능:
     > `0.0.0.0/0` → 모든 IP에서 접근 허용 (**개발용으로만 사용**, 운영 환경에서는 제한 필요)

<br><br><br>

### (MongoDB Compass 연결)
#### Compass란?

MongoDB에서 제공하는 **공식 GUI(그래픽 사용자 인터페이스) 도구**로,  
데이터베이스를 **직접 보고 관리**할 수 있는 프로그램.

- MongoDB Atlas와 연결하여 **클러스터 내의 DB 및 컬렉션**을 시각적으로 탐색 및 관리 가능
- **개발자 및 운영자**가 쉽게 쿼리 작성, 데이터 편집, 인덱스 설정 가능

---

#### 주요 기능

- 쿼리 작성 및 실행
- 데이터 추가, 수정, 삭제
- 컬렉션 및 인덱스 관리
- 데이터 시각화 (도큐먼트 분포, 필터 등)

---

#### 진행단계

1. **Atlas에서 제공받은 연결 문자열(URI)을 Compass에 입력**
   - `Connection` 메뉴에서 연결 문자열을 입력하여 클러스터와 연결
   - Ex. `mongodb+srv://<username>:<password>@cluster0.mongodb.net/`

2. **연결 완료 후, 컬렉션 생성 및 필드 추가**
   - Compass에서 새로운 **컬렉션(Collection)**을 만들고,
   - 그 안에 **도큐먼트(Document)**를 추가하여 데이터를 구성

---

#### + 컬렉션 필드란?
   -  **컬렉션 안에 들어가는 실제 데이터의 항목(속성)**

<br><br><br>

### (컬렉션 필드 및 인덱스 설정)
#### 진행단계
1. **컬렉션 구성**
   - `Comment.js`, `User.js`, `Post.js` 총 **3개의 컬렉션 필드**로 구성

`User 컬렉션`
```js
{
  _id: ObjectId,
  username: String,       // 사용자 아이디, unique
  email: String,          // 이메일, unique
  password: String,       // 해싱된 비밀번호
  nickname: String,       // 표시 이름
  profileImage: String,   // 프로필 이미지 경로
  bio: String,            // 자기소개 (최대 500자)
  major: String,          // 전공 분야 (수학, 물리학, 화학, 생물학, 컴퓨터공학, 전자공학, 기계공학, 경영학, 경제학, 심리학, 사회학, 기타)
  website: String,        // 개인 웹사이트 URL
  socialLinks: {          // 소셜 미디어 링크
    github: String,
    twitter: String
  },
  role: String,           // 사용자 권한 (user/admin)
  resetPasswordToken: String, // 비밀번호 재설정 토큰
  resetPasswordExpire: Date,  // 토큰 만료 시간
  createdAt: Date,        // 가입 일자
  updatedAt: Date         // 정보 수정 일자
}
```

`Posts 컬렉션`
```js
{
  _id: ObjectId,
  title: String,          // 게시글 제목 (최대 100자)
  content: String,        // 게시글 내용 (마크다운 지원)
  author: ObjectId,       // 작성자 ID (users 컬렉션 참조)
  categories: [String],   // 카테고리 배열 (수학, 물리학, 화학, 생물학, 컴퓨터공학, 전자공학, 기계공학, 경영학, 경제학, 심리학, 사회학, 기타)
  tags: [String],         // 태그 배열 (최대 5개)
  attachments: [{         // 첨부파일 배열 (최대 3개)
    filename: String,     // 서버에 저장된 파일명
    originalname: String, // 원본 파일명
    path: String,         // 파일 접근 경로
    mimetype: String,     // 파일 MIME 타입
    size: Number,         // 파일 크기 (바이트)
    uploadDate: Date      // 업로드 일시
  }],
  viewCount: Number,      // 조회수
  likes: [ObjectId],      // 좋아요한 사용자 ID 배열
  comments: [ObjectId],   // 댓글 ID 배열 (comments 컬렉션 참조)
  isSolved: Boolean,      // 해결 여부
  createdAt: Date,        // 작성 일자
  updatedAt: Date         // 수정 일자
}
```

`Comments 컬렉션`
```js
{
  _id: ObjectId,
  content: String,        // 댓글 내용 (최대 500자)
  author: ObjectId,       // 작성자 ID (users 컬렉션 참조)
  post: ObjectId,         // 게시글 ID (posts 컬렉션 참조)
  parent: ObjectId,       // 부모 댓글 ID (대댓글인 경우, null이면 최상위 댓글)
  attachments: [{         // 첨부파일 배열 (최대 2개) - 새로 추가된 필드
    filename: String,     // 서버에 저장된 파일명 (예: a7b3c9d1.pdf)
    originalname: String, // 원본 파일명 (예: 답변자료.pdf)
    path: String,         // 파일 접근 경로 (예: /uploads/comment-attachments/a7b3c9d1.pdf)
    mimetype: String,     // 파일 MIME 타입 (예: application/pdf)
    size: Number,         // 파일 크기 (바이트)
    uploadDate: Date      // 업로드 일시
  }],
  likes: [ObjectId],      // 좋아요한 사용자 ID 배열
  isDeleted: Boolean,     // 삭제 여부
  createdAt: Date,        // 작성 일자
  updatedAt: Date         // 수정 일자
}
```

2. **컬렉션 코드 작성**
   - VS Code 내에서 **Mongoose 스키마 기반 코드 작성 및 저장**

3. **Compass에서 확인**
   - MongoDB Compass에서 **컬렉션 및 인덱스 자동 생성 여부 확인 가능**

---

#### 스키마 검증 (Schema Validation)

Mongoose에서의 스키마는 **데이터 구조를 정의하고**,  
SQL에서의 제약조건(Constraints) 역할도 수행.

#### 예시 제약조건

| 조건             | 설명                                       |
|------------------|-------------------------------------------|
| `required`       | 해당 필드는 **반드시 존재**해야 함            |
| `unique`         | **고유한 값**만 저장 가능 (중복 불가)         |
| `type`           | `String`, `Number` 등 **자료형 명시**       |
| `maxlength` 등   | **길이 제한** 또는 **정규식 패턴** 지정 가능   |

---

#### 인덱스 정의

| **Type** | **Properties**    | **설명**                                               |
|----------|-------------------|-------------------------------------------------------|
| REGULAR  | UNIQUE            | 단일 인덱스, **유일한 값만 허용**                         |
| REGULAR  | X                 | 단일 인덱스, **중복 허용**                               |
| REGULAR  | COMPOUND          | **복합 인덱스**, 두 개 이상의 필드를 묶어서 인덱싱          |
| TEXT     | X                 | **텍스트 검색 전용 인덱스**, `title`, `content` 등에 사용  |

<br><br><br>

### (VSCode환경 구성)
#### 진행단계
1. MongoDB for VS Code 확장 프로그램 설치
- VS Code에서 MongoDB 데이터베이스에 **직접 연결**하고  
  데이터를 **조회, 편집, 관리**할 수 있도록 도와주는 공식 확장 프로그램.
- 설치 후 `.env`의 연결 URI를 통해 클러스터 연결 가능

---

2. Models 폴더 구성

| 파일명          | 역할                           |
|----------------|-------------------------------|
| `Comment.js`   | 댓글 관련 **인덱스 정의**        |
| `Post.js`      | 게시글 관련 **인덱스 정의**      |
| `User.js`      | 유저 정보 관련 **인덱스 정의**    |

---

3. Routes 폴더 구성

| 파일명              | 역할                       |
|--------------------|----------------------------|
| `commentRoutes.js` | 댓글 **등록 API** 정의       |
| `postRoutes.js`    | 게시글 **작성 API** 정의     |
| `userRoutes.js`    | 사용자 **회원가입 API** 정의  |

---

#### 주의사항

- **`.env 파일 관리`**
  - MongoDB 연결 문자열 및 비밀번호는 **코드에 직접 작성하지 않고**,  
    `.env` 파일에서 별도로 관리.(보안성 향상)

- **에러 처리 및 로깅**
  - Express 앱에서 발생할 수 있는 다양한 에러(예: DB 연결 실패, 요청 오류 등)를 위해  
    `try-catch`, `에러 핸들링 미들웨어` 등을 추가.

---

<br><br><br>

### (서버 실행)
#### 진행단계

- **Node index.js 명령어를 통해 서버 실행**
  - `index.js` 파일을 기준으로 Express 서버가 실행.
  - 터미널 명령어 입력: **node index.js**

- **'Mongoose 라이브러리'를 통해 MongoDB 클러스터에 연결**
  - MongoDB와 Node.js를 연결해주는 ODM(Object Data Modeling) 라이브러리
  - MongoDB 데이터를 다룰 때 **더 쉽고, 체계적으로 작업 가능**
    ```js
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB 연결 성공'))
      .catch(err => console.error('MongoDB 연결 실패:', err));
    ```

- **Postman을 활용하여 서버에 요청 전송 및 확인**
  - 서버 API가 제대로 작동하는지 테스트 가능
    - `POST /users/register` → 회원가입 요청
    - `POST /posts` → 게시글 등록
    - `GET /comments` → 댓글 목록 확인

<br><br><br>

### [Postman을 활용한 MongoDB Post요청 테스트]
- **API 테스트**
  - RESTful API와 MongoDB를 쉽게 연동하여 동작 여부 확인 가능.

- **CRUD 작업**
  - 데이터 **생성(Create)**, **조회(Read)**, **수정(Update)**, **삭제(Delete)**를 위한  
    다양한 API 엔드포인트를 구성 및 테스트.

- **인증 설정**
  - 토큰 기반 인증을 활용하여 **사용자 인증 및 권한 제어**를 설정 가능.

- **워크플로우 자동화**
  - 테스트 환경에서 API 호출 순서를 미리 구성하여 **자동화된 요청 흐름**을 구성 가능.
---

#### Postman이란?

- API를 테스트하고 관리할 수 있는 도구  
  (웹사이트 없이도 API 서버와 **직접 대화할 수 있는 메신저**처럼 동작)

- 개발자가 서버로 HTTP 요청을 보내고,  
  서버의 응답 및 데이터 전송 여부를 **직관적으로 확인**가능.
---

#### 주요 기능

- `GET`, `POST`, `PUT`, `DELETE` 등 다양한 HTTP 요청 방식 지원  
- 요청의 **헤더(Header)**, **본문(Body)**, **쿼리 파라미터** 등을 자유롭게 설정 가능  
- API 응답 결과(상태 코드, 응답 본문 등)를 **직관적인 UI로 시각화**하여 확인 가능
