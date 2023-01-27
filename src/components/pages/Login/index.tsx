import React from "react";
import { Helmet } from "react-helmet-async";

import ButtonLink from "../../atoms/Button/ButtonLink";
import Loading from "../../atoms/Loading";
import LoginForm from "../../organisms/forms/LoginForm";

export default function Login() {
  return (
    <div className="page relative">
      <Helmet>
        <body className="black"></body>
      </Helmet>
      <div className="no-overflow">
        <Loading small={true} text="ifeel/ALERT" />
      </div>
      <div style={{ marginTop: "260px" }} />
      <LoginForm />
      <ButtonLink text="Create new account" to="/register" />
    </div>
  );
}
