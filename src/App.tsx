import React from 'react';
import StateOfMind from './components/pages/StateOfMind';
import './App.css';
import './components/variables.css';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import SignalsAndActions from "./components/pages/SignalsAndActions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/me/signs" element={<SignalsAndActions />}/>
        <Route path="/me" element={<StateOfMind userType="sharer"/>}/>
        <Route path="/" element={<StateOfMind userType="listener"/>}/>
      </Routes>
    </Router>

  );
}

export default App;
