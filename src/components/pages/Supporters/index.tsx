import React from 'react';
import '../style.css';
import Toolbar from "../../molecules/Toolbar";
import Title from "../../atoms/text/Title";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {getStateOfUser, getSupporters} from "../../../helpers/get";
import {User} from "../../../helpers/types";
import {getCurrentUser} from "../../../helpers/auth";

export default function Supporters() {
  const [user, setUser] = React.useState<User | null>(null);
  const [supporters, setSupporters] = React.useState([]);

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUser(user);
        getSupporters(user.id).then((supporters) => {
        });
      }
    });
  }, [])

  return (
    <>
      <Toolbar button={<LinkCircleButton to={'/me'}>⚙</LinkCircleButton>}/>
      <div className="page">
        <Title theme="default">Supporters</Title>
        Ask for support link: /support/{user?.id}
      </div>
    </>
  );
}
