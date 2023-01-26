import React from "react";
import TextField from "../../../atoms/inputs/TextField";
import Submit from "../../../atoms/inputs/Submit";
import "./style.css";
import { register } from "../../../../helpers/auth";
import Title from "../../../atoms/text/Title";
import Button from "../../../atoms/Button";
import { supabase } from "../../../../helpers/client";

export default function RegisterForm({
  type,
  shareUserId,
}: {
  type: "sharer" | "supporter";
  shareUserId?: string;
}) {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = await register({
      email,
      password,
      type,
      name,
    });

    if (shareUserId) {
      await supabase.from("sharer_supporter").insert({
        sharer_id: shareUserId,
        supporter_id: userId,
      });
    }

    if (userId) {
      setSuccess(true);
    }
  };

  return success ? (
    <div>
      <Title>Welcome!</Title>
      <Button
        text="Log in"
        onClick={() => {
          window.location.assign("/");
        }}
      />
    </div>
  ) : (
    <form onSubmit={onSubmit} className="new-sign-or-action-form">
      <TextField
        name="email"
        onChange={(value) => {
          setEmail(value);
        }}
      />
      <TextField
        name="password"
        onChange={(value) => {
          setPassword(value);
        }}
      />
      <TextField
        name="name"
        onChange={(value) => {
          setName(value);
        }}
      />
      <Submit name="Create new account" />
    </form>
  );
}
