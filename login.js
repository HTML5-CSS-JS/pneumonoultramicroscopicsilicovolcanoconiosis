const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');

// 로컬스토리지 체크
const adminRegistered = localStorage.getItem('adminRegistered');

if (!adminRegistered) {
    signupBtn.disabled = false;
}

        // 일반 회원가입 (관리자 최초 1회)
signupBtn.addEventListener('click', () => {
    const username = prompt("관리자 계정 생성 - 사용자 이름 입력:");
    const password = prompt("비밀번호 입력:");

    if (username && password) {
        // 비밀번호 암호화 (SHA256)
        const hashed = CryptoJS.SHA256(password).toString();
        localStorage.setItem('adminRegistered', 'true');
        localStorage.setItem('adminUser', JSON.stringify({username, password: hashed}));
        alert(`${username}님, 관리자 계정이 생성되었습니다!`);
        signupBtn.disabled = true;
    }
});

// 로그인
loginBtn.addEventListener('click', () => {
    const username = prompt("로그인 - 사용자 이름 입력:");
    const password = prompt("로그인 - 비밀번호 입력:");

    const stored = JSON.parse(localStorage.getItem('adminUser'));
    if (!stored) return alert("등록된 계정이 없습니다.");

    const hashed = CryptoJS.SHA256(password).toString();
    if (username === stored.username && hashed === stored.password) {
        alert(`${username}님, 로그인 성공!`);
    } else {
        alert("사용자 이름 또는 비밀번호가 틀렸습니다.");
    }
});
