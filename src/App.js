import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './join/Join.js';
import RegisterForm from './join/RegisterFrom.js';
import { Link } from 'react-router-dom';

function App() {
  return (
  
    <Router>
      <Routes>
        <Route path='/join' element={<Join />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>

    </Router>
  );
}

export default App;
