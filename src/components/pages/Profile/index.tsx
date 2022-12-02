import React  from 'react'
import '../style.css'
import Toolbar from "../../molecules/Toolbar";
import ButtonLink from "../../atoms/Button/ButtonLink";
import Button from "../../atoms/Button";
import {logout} from "../../../helpers/auth";

export default function Profile() {
  return (
    <>
      <Toolbar title="Perry's Profile" />
      <div className="page">
        <ButtonLink text="Signals and Actions" to="/me/signs" />
        <Button text="Log out" onClick={() => logout()} />
      </div>
    </>
  )
}
