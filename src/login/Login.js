import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    
    try{
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        email,
        password
        } 
      );
      const accessToken = response.headers.Authorization.split(' ')[1];
      localStorage.setItem('accessToken', accessToken);
      
      navigate('http://localhost:3000');
    }
    catch(e){
      console.log("로그인 에러", e)
    }

  };

  const handleSignup = () => {

    navigate('http://localhost:3000/join');

    // 회원가입 페이지로 이동
    console.log('Signup clicked');
  };

  return (
    <div className="login-container">
      <h2 className="title">로그인</h2>
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button className="login-btn" onClick={handleLogin}>
        로그인
      </button>
      <div className="signup-container">
        <a href="#" className="signup-link" onClick={handleSignup}>
          회원가입
        </a>
        <div className="social-login">
          <img src="google.png" alt="Google" className="social-icon" />
          <img src="kakao.png" alt="Kakao" className="social-icon" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
