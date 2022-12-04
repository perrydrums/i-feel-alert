import React  from 'react'
import LoginForm from "../../organisms/forms/LoginForm";
import ButtonLink from "../../atoms/Button/ButtonLink";

export default function Login() {
  return (
    <div>
      <LoginForm />
      <ButtonLink text="Register" to="/register" />
    </div>
  )
}
