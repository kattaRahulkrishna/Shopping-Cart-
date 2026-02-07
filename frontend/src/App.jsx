import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ItemList from './components/ItemList';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Login setToken={setToken} /> : <Navigate to="/items" />} />
        <Route path="/items" element={token ? <ItemList /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={token ? "/items" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
