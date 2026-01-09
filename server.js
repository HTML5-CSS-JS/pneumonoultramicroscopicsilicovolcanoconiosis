// server.js
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// 메모리 기반 저장 (실제 서비스에서는 DB 사용)
let adminUser = null;

// 회원가입 (최초 관리자 계정 생성)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (adminUser) {
    return res.status(400).json({ message: '이미 관리자 계정이 존재합니다.' });
  }

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
  }

  const hashed = crypto.createHash('sha256').update(password).digest('hex');
  adminUser = { username, password: hashed };

  res.json({ message: `${username}님, 관리자 계정이 생성되었습니다!` });
});

// 로그인
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!adminUser) {
    return res.status(400).json({ message: '등록된 계정이 없습니다.' });
  }

  const hashed = crypto.createHash('sha256').update(password).digest('hex');
  if (username === adminUser.username && hashed === adminUser.password) {
    res.json({ message: `${username}님, 로그인 성공!` });
  } else {
    res.status(401).json({ message: '사용자 이름 또는 비밀번호가 틀렸습니다.' });
  }
});

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
