import React  from 'react'
import LoginForm from "../../organisms/forms/LoginForm";
import ButtonLink from "../../atoms/Button/ButtonLink";
import {Helmet} from "react-helmet";
import Loading from "../../atoms/Loading";

export default function Login() {
  return (
    <div className="page">
      <Helmet>
        <body className="black" ></body>
      </Helmet>
      <Loading small={true}/>
      <LoginForm />
      <ButtonLink text="Register" to="/register" />
    </div>
  )
}
