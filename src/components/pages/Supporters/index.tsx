import React from 'react';
import '../style.css';
import Toolbar from "../../molecules/Toolbar";
import Title from "../../atoms/text/Title";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {getSupporters} from "../../../helpers/get";
import {User} from "../../../helpers/types";
import {getCurrentUser} from "../../../helpers/auth";
import Button from "../../atoms/Button";

export default function Supporters() {
  const [user, setUser] = React.useState<User | null>(null);
  const [supporters, setSupporters] = React.useState([] as User[]);

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUser(user);
        getSupporters(user.id).then((supporters) => {
          setSupporters(supporters);
        });
      }
    });
  }, []);

  const supportersList = supporters.map((supporter) =>
    <li key={supporter.id}>
      {supporter.name} <br/>
      <small>{supporter.email}</small>
    </li>
  );

  function shareSupportLink() {
    if (navigator.share) {
      navigator.share({
        title: 'WebShare API Demo',
        url: `/support/${user?.id}`
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(console.error);
    } else {
      // fallback
    }
  }

  return (
    <>
      <Toolbar button={<LinkCircleButton to={'/me'}>⚙</LinkCircleButton>}/>
      <div className="page">
        <Title theme="default">Supporters</Title>
        <Button text="Ask for support" onClick={shareSupportLink} />
        <ul>
          {supportersList}
        </ul>
      </div>
    </>
  );
}
