import React from "react";
import { HelmetProvider } from "react-helmet-async";
import OneSignal from "react-onesignal";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import "./App.css";
import Loading from "./components/atoms/Loading";
import Login from "./components/pages/Login";
import OfferSupport from "./components/pages/OfferSupport";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import SignalsAndActions from "./components/pages/SignalsAndActions";
import StateOfMind from "./components/pages/StateOfMind";
import Supporters from "./components/pages/Supporters";
import "./components/variables.css";
import { UserContext } from "./context/User";
import { getCurrentUser } from "./helpers/auth";
import { User } from "./helpers/types";

function App() {
  const [user, setUser] = React.useState<User | null>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);

      OneSignal.init({
        appId: "57507296-ef2e-4355-990a-9f0b84790626",
      }).then(async () => {
        if (user) {
          OneSignal.login(user.id);
        }
      });

      setLoading(false);
    });
  }, []);

  return !loading ? (
    <HelmetProvider>
      <Router>
        {user ? (
          <UserContext.Provider value={user}>
            <Routes>
              <Route path="/me/signs" element={<SignalsAndActions />} />
              <Route path="/me/supporters" element={<Supporters />} />
              <Route path="/me" element={<Profile />} />
              <Route path="/support/:sharerUserId" element={<OfferSupport />} />
              <Route path="/" element={<StateOfMind />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </UserContext.Provider>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/support/:sharerUserId" element={<OfferSupport />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<></>} />
          </Routes>
        )}
      </Router>
    </HelmetProvider>
  ) : (
    <Loading />
  );
}

export default App;
