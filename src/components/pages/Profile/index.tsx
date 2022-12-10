import React  from 'react'
import '../style.css'
import Toolbar from "../../molecules/Toolbar";
import ButtonLink from "../../atoms/Button/ButtonLink";
import Button from "../../atoms/Button";
import {getCurrentUser, logout} from "../../../helpers/auth";
import {LinkCircleButton} from "../../atoms/CircleButton";
import {User} from "../../../helpers/types";

export default function Profile() {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <>
      <Toolbar title={`${user?.name}'s Profile`}
               button={<LinkCircleButton to={'/'}>⦾</LinkCircleButton>}
      />
      <div className="page">
        {user?.type === 'sharer'
          ? <>
              <ButtonLink text="Signals and Actions" to="/me/signs" />
              <ButtonLink text="Supporters" to="/me/supporters" />
          </>
          : <>

            </>
        }
        <Button text="Log out" onClick={() => logout()} />
      </div>
    </>
  )
}
