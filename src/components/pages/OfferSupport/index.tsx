import React, {useEffect} from 'react';
import '../style.css';
import {useParams} from "react-router-dom";
import {getUserById} from "../../../helpers/get";
import {User} from "../../../helpers/types";
import {getCurrentUser} from "../../../helpers/auth";
import Button from "../../atoms/Button";
import {supabase} from "../../../helpers/client";

export default function OfferSupport() {
  const { sharerUserId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [sharerUser, setSharerUser] = React.useState<User>();
  const [user, setUser] = React.useState<User | null>(null);

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
      getCurrentUser().then(cu => {
        if (cu) {
          setUser(cu);
        }
      });
    }
  }, [sharerUserId]);

  async function supportUser() {
    if (user && sharerUser) {
      await supabase
        .from('sharer_supporter')
        .insert({
          sharer_id: sharerUser.id,
          supporter_id: user.id,
        });
    }
  }

  return (
    <div className="page">
      {!loading
        ? sharerUser
          ? (
            <>
              <h1>Offer support to {sharerUser.name}</h1>
              {user
                ? (
                  <Button text={`Offer support to ${sharerUser.name}`} onClick={() => supportUser()} />
                )
                : <p>You need to be logged in to offer support</p>
              }
            </>
          )
          : <h1>User not found</h1>
        : <h1>Loading...</h1>

      }

    </div>
  )
}
