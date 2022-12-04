import React from 'react';
import StateOfMind from './components/pages/StateOfMind';
import './App.css';
import './components/variables.css';
import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import SignalsAndActions from "./components/pages/SignalsAndActions";
import {isLoggedIn} from "./helpers/auth";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Supporters from "./components/pages/Supporters";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    isLoggedIn().then(setLoggedIn);
  }, []);

  return (
    <Router>
        {loggedIn ? (
          <Routes>
            <Route path="/me/signs" element={<SignalsAndActions />}/>
            <Route path="/me/supporters" element={<Supporters />}/>
            <Route path="/me" element={<Profile />}/>
            <Route path="/" element={<StateOfMind />}/>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        )}
    </Router>

  );
}

export default App;
