import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Style.css';
import InputEmployees from './Employee/InputEmployees';
import ViewEmployees from './Employee/ViewEmployees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/input" element={<InputEmployees />} />
        <Route path="/view" element={<ViewEmployees />} />
        <Route path="/" element={<InputEmployees />} />
      </Routes>
    </Router>
  );
}

export default App;
