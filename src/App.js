import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './join/RegisterFrom.js';
import LoginPage from './login/Login.js';
import Map from './map/map.js';
import Search from './v1/v1.js';
import SearchPlaces from './search/search.js';
import V2 from './v2/v2.js';

function App() {
  return (
    
  
    <Router>
      <Routes>
        {/* <Route path='/join' element={<Join />} /> */}
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element ={<LoginPage />} />
        <Route path='/map' element = {<Map />} />
        <Route path='/search' element = {<Search />} />
        <Route path='/searchP' element = {<SearchPlaces />} />
        <Route path='/v2' element = {<V2 />} />
      </Routes>
    </Router>
  );
}

export default App;
