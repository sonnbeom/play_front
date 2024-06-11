import React, { useState } from 'react';
import './join.css';
// import './JoinForm.css';

const Join = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 회원가입 로직을 구현할 수 있습니다.;
  };
  const onSubmit = () => {
    // 제출 시에 post요청 실행
    console.log("제출이요.")
  }

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={onSubmit}>회원가입</button>
      </form>
      <div className="terms-and-conditions">
        <input
          type="checkbox"
          checked={termsChecked}
          onChange={(e) => setTermsChecked(e.target.checked)}
          required
        />
        <a href="#">이용약관</a>과 <a href="#">개인정보 처리방침</a>에 동의합니다.
      </div>
    </div>
  );
};

export default Join;
