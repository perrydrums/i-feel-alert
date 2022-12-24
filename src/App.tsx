import React from 'react';
import StateOfMind from './components/pages/StateOfMind';
import './App.css';
import './components/variables.css';
import {
  BrowserRouter as Router, Navigate,
  Route, Routes,
} from 'react-router-dom';
import SignalsAndActions from "./components/pages/SignalsAndActions";
import {getCurrentUser} from "./helpers/auth";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Supporters from "./components/pages/Supporters";
import OfferSupport from "./components/pages/OfferSupport";
import {UserContext} from "./context/User";
import {User} from "./helpers/types";

function App() {
  const [user, setUser] = React.useState<User | null>();

  React.useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
        {user ? (
          <UserContext.Provider value={user}>
            <Routes>
              <Route path="/me/signs" element={<SignalsAndActions />}/>
              <Route path="/me/supporters" element={<Supporters />}/>
              <Route path="/me" element={<Profile />}/>
              <Route path="/support/:sharerUserId" element={<OfferSupport />}/>
              <Route path="/" element={<StateOfMind />}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </UserContext.Provider>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/support/:sharerUserId" element={<OfferSupport />}/>
            <Route path="/" element={<Login />}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </Router>

  );
}

export default App;
