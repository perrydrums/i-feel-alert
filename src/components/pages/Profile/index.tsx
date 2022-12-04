import React  from 'react'
import '../style.css'
import Toolbar from "../../molecules/Toolbar";
import ButtonLink from "../../atoms/Button/ButtonLink";
import Button from "../../atoms/Button";
import {logout} from "../../../helpers/auth";
import {LinkCircleButton} from "../../atoms/CircleButton";

export default function Profile() {
  return (
    <>
      <Toolbar title="Perry's Profile"
               button={<LinkCircleButton to={'/'}>⦾</LinkCircleButton>}
      />
      <div className="page">
        <ButtonLink text="Signals and Actions" to="/me/signs" />
        <ButtonLink text="Supporters" to="/me/supporters" />
        <Button text="Log out" onClick={() => logout()} />
      </div>
    </>
  )
}
