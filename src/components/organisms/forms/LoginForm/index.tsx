import React from "react";
import TextField from "../../../atoms/inputs/TextField";
import Submit from "../../../atoms/inputs/Submit";
import "./style.css";
import { login } from "../../../../helpers/auth";
import Password from "../../../atoms/inputs/Password";
import { supabase } from "../../../../helpers/client";

export default function LoginForm({ shareUserId }: { shareUserId?: string }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userAccount = await login(email, password);

    if (!userAccount.error) {
      if (shareUserId) {
        await supabase.from("sharer_supporter").insert({
          sharer_id: shareUserId,
          supporter_id: userAccount.data.user?.id,
        });
      }

      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <h3 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h3>
      <TextField
        name="email"
        onChange={(value) => {
          setEmail(value);
        }}
      />
      <Password
        name="password"
        onChange={(value) => {
          setPassword(value);
        }}
      />
      <Submit name="Log in" />
    </form>
  );
}
