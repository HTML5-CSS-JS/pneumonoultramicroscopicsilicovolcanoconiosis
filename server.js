const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

let adminUser = null;

// 회원가입
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (adminUser) return res.status(400).json({ message: '이미 관리자 계정이 존재합니다.' });
  if (!username || !password) return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });

  const hashed = crypto.createHash('sha256').update(password).digest('hex');
  adminUser = { username, password: hashed };
  res.json({ message: `${username}님, 관리자 계정이 생성되었습니다!` });
});

// 로그인
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!adminUser) return res.status(400).json({ message: '등록된 계정이 없습니다.' });

  const hashed = crypto.createHash('sha256').update(password).digest('hex');
  if (username === adminUser.username && hashed === adminUser.password) {
    res.json({ message: `${username}님, 로그인 성공!` });
  } else {
    res.status(401).json({ message: '사용자 이름 또는 비밀번호가 틀렸습니다.' });
  }
});

// 로그아웃
app.post('/logout', (req, res) => {
  res.json({ message: '로그아웃 완료!' });
});

// 관리자 계정 조회
app.get('/admin', (req, res) => {
  if (!adminUser) return res.status(404).json({ message: '관리자 계정이 없습니다.' });
  res.json({ username: adminUser.username });
});

// 상태 확인
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});