import React, { useState } from 'react';
import axios from 'axios';
import './join.css';


const Join = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleProfile = (e) => {
    setProfile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("memeberDto", JSON.stringify({
        name,
        nickname,
        email,
        password
      }));
      if(profile){
        formData.append("profile", profile)
      }


      const response = await axios.post('http://localhost:8080/api/v1/member', formData, {
        headers: {
          'Content-Type': 'multipart/forom-data'
        }
      });
    
      if (response.status === 200) {
        console.log('회원가입 성공');
      } else {
        console.error('회원가입 실패:', response.status);
      }
    } catch (error) {
      console.error('요청 실패:', error);
    }
    
    // 여기서 회원가입 로직을 구현할 수 있습니다.;
  };

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
          type='file'
          accept='image/*'
          name='profile'
          value={profile}
          onChange={(e) => handleProfile(e)}
          className='profile-input'
        />
      <button className="profile-button">이미지 등록</button>
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
        <button type="submit" >회원가입</button>
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
