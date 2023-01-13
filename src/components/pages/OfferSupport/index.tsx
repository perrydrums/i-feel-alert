import React, {useEffect} from 'react';
import '../style.css';
import {useParams} from "react-router-dom";
import {getUserById} from "../../../helpers/get";
import {User} from "../../../helpers/types";
import RegisterForm from "../../organisms/forms/RegisterForm";
import LoginForm from "../../organisms/forms/LoginForm";

export default function OfferSupport() {
  const { sharerUserId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [sharerUser, setSharerUser] = React.useState<User>();

  useEffect(() => {
    if (sharerUserId) {
      getUserById(sharerUserId)
        .then(su => {
          setSharerUser(su);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [sharerUserId]);

  return (
    <div className="page">
      {!loading
        ? sharerUser
          ? (
            <>
              <h1>Offer support to {sharerUser.name}</h1>
              <p>Please create your supporter account to be able to see {sharerUser.name}'s state of mind.</p>
              <p>Already have an account? <span style={{textDecoration: 'underline'}} onClick={() => setShowLoginForm(!showLoginForm)}>Log in.</span></p>
              {showLoginForm
                ? <LoginForm shareUserId={sharerUserId} />
                : <RegisterForm type="supporter" shareUserId={sharerUserId} />
              }
            </>
          )
          : <h1>User not found</h1>
        : <h1>Loading...</h1>

      }

    </div>
  )
}
