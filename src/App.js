import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './join/Join.js';
import { Link } from 'react-router-dom';

function App() {
  return (
  
    <Router>
      <Routes>
        <Route path='/join' element={<Join />} />
      </Routes>

    </Router>
  );
}

export default App;
