import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Join from './join/Join.js';
import RegisterForm from './join/RegisterFrom.js';
import LoginPage from './login/Login.js';
import { Link } from 'react-router-dom';

function App() {
  return (
  
    <Router>
      <Routes>
        {/* <Route path='/join' element={<Join />} /> */}
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element ={<LoginPage />} />
      </Routes>

    </Router>
  );
}

export default App;
