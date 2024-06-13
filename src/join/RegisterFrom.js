import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if(password !== confirmPassword){
      alert("비밀번호와 비밀번호 확인에 입력한 비밀번호 값이 일치하지 않습니다.")
      return;
    }
    try{
      const formData = new FormData();
      
      // formData.append("memberDto", JSON.stringify({
      // name,
      // nickname,
      // email,
      // password
      // }));
      const memberDto = {
        name,
        nickname,
        email,
        password
      };
      formData.append("memberDto", new Blob([JSON.stringify(memberDto)], {type: "application/json"}));

      formData.append("profile", profileImage);
      
      const respose = await axios.post('http://localhost:8080/api/v1/member', 
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if(respose.status === 201){
        console.log('성공');
      }else{
        console.log('실패', respose.status);
      }

    }
    catch(error){
      console.log("요청 실패", error)
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">회원가입</p>
      <p className="message"></p>
      <div className="flex">
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>이름</span>
        </label>
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <span>닉네임</span>
        </label>
      </div>
      <label>
        <input
          className="input"
          type="email"
          placeholder=""
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>이메일</span>
      </label>
      <label>
        <input
          className="input"
          type="password"
          placeholder=""
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>비밀번호</span>
      </label>
      <label>
        <input
          className="input"
          type="password"
          placeholder=""
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span>비밀번호 확인</span>
      </label>
      <label className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="image-input"
        />
        {profileImage ? (
          <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image" />
        ) : (
          <span>Upload Profile Image</span>
        )}
      </label>
      <button className="submit" type="submit">
        회원가입
      </button>
      <p className="signin">
        이미 회원이신가요 ? <a href="#">로그인</a>
      </p>
    </form>
  );
};

export default RegisterForm;
