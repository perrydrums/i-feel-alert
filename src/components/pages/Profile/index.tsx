import React from "react";
import { Helmet } from "react-helmet-async";

import { useUserContext } from "../../../context/User";
import { logout } from "../../../helpers/auth";
import Button from "../../atoms/Button";
import ButtonLink from "../../atoms/Button/ButtonLink";
import { LinkCircleButton } from "../../atoms/CircleButton";
import Toolbar from "../../molecules/Toolbar";
import "../style.css";

export default function Profile() {
  const user = useUserContext();

  return (
    <>
      <Helmet>
        <body className="black"></body>
      </Helmet>
      <Toolbar
        title={`${user?.name}'s Profile`}
        button={<LinkCircleButton to={"/"}>⦾</LinkCircleButton>}
      />
      <div className="page">
        {user?.type === "sharer" ? (
          <>
            <ButtonLink text="Signals and Actions" to="/me/signs" />
            <ButtonLink text="Supporters" to="/me/supporters" />
          </>
        ) : (
          <></>
        )}
        <Button text="Log out" onClick={() => logout()} />
      </div>
    </>
  );
}
