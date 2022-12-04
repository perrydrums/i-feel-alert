import React  from 'react';
import Radio from "../../../atoms/inputs/Radio";
import TextField from "../../../atoms/inputs/TextField";
import Submit from "../../../atoms/inputs/Submit";
import './style.css';
import {register} from "../../../../helpers/auth";
import Title from "../../../atoms/text/Title";
import Button from "../../../atoms/Button";

export default function RegisterForm() {
  const [type, setType] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await register({
      email, password, type, name
    });

    if (success) {
      setSuccess(true);
    }
  };

  return success ? (
    <div>
      <Title>Welcome!</Title>
      <Button text="Log in" onClick={() => {window.location.assign('/')}} />
    </div>
  ) : (
    <form onSubmit={onSubmit}
          className="new-sign-or-action-form"
    >
      <Radio options={['sharer', 'listener']}
             name="type"
             onChange={(value) => { setType(value) }}
      />
      <TextField name="email"
                 onChange={(value) => { setEmail(value) }}
      />
      <TextField name="password"
                 onChange={(value) => { setPassword(value) }}
      />
      <TextField name="name"
                 onChange={(value) => { setName(value) }}
      />
      <Submit name="Submit" />
    </form>
  )
}
