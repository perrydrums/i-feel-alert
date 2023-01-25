import React  from 'react'
import LoginForm from "../../organisms/forms/LoginForm";
import ButtonLink from "../../atoms/Button/ButtonLink";
import {Helmet} from "react-helmet";
import Loading from "../../atoms/Loading";

export default function Login() {
  return (
    <div className="page relative">
      <Helmet>
        <body className="black" ></body>
      </Helmet>
      <div className="no-overflow">
        <Loading small={true} text="ifeel/ALERT"/>
      </div>
      <div style={{marginTop: '260px'}} />
      <LoginForm />
      <ButtonLink text="Create new account" to="/register" />
    </div>
  )
}
