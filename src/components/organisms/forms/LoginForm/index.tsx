import React  from 'react';
import TextField from "../../../atoms/inputs/TextField";
import Submit from "../../../atoms/inputs/Submit";
import './style.css';
import {login} from "../../../../helpers/auth";
import Password from "../../../atoms/inputs/Password";

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userAccount = await login(email, password);

    if (!userAccount.error) {
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={onSubmit}
          className="login-form"
    >
      <TextField name="email"
                 onChange={(value) => { setEmail(value) }}
      />
      <Password name="password"
                 onChange={(value) => { setPassword(value) }}
      />
      <Submit name="Log in" />
    </form>
  )
}
