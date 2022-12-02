import React  from 'react'
import '../style.css'
import Toolbar from "../../molecules/Toolbar";
import ButtonLink from "../../atoms/Button/ButtonLink";

export default function Profile() {
  return (
    <>
      <Toolbar title="Perry's Profile" />
      <div className="page">
        <ButtonLink text="Signals and Actions" to="/me/signs" />
      </div>
    </>
  )
}
