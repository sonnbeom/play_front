import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './join/RegisterFrom.js';
import LoginPage from './login/Login.js';
import Location from './location/location.js';

function App() {
  return (
    
  
    <Router>
      <Routes>
        {/* <Route path='/join' element={<Join />} /> */}
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element ={<LoginPage />} />
        <Route path='/location' element = {<Location />} />
      </Routes>
    </Router>
  );
}

export default App;
