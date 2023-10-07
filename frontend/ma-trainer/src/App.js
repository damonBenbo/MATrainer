import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ToolbarComponent from './components/Toolbar'; // Import the toolbar component
import './App.css';

function App() {
  return (
    <Router>
      <ToolbarComponent /> {/* Include the toolbar */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;