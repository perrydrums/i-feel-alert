import React from "react";
import "../style.css";
import Toolbar from "../../molecules/Toolbar";
import ButtonLink from "../../atoms/Button/ButtonLink";
import Button from "../../atoms/Button";
import { logout } from "../../../helpers/auth";
import { LinkCircleButton } from "../../atoms/CircleButton";
import { useUserContext } from "../../../context/User";
import { Helmet } from "react-helmet-async";

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
