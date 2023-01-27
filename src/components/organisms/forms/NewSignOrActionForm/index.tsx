import React from "react";

import { getCurrentUser } from "../../../../helpers/auth";
import { supabase } from "../../../../helpers/client";
import Radio from "../../../atoms/inputs/Radio";
import Submit from "../../../atoms/inputs/Submit";
import TextArea from "../../../atoms/inputs/TextArea";
import "./style.css";

export default function NewSignOrActionForm() {
  const [type, setType] = React.useState("");
  const [state, setState] = React.useState("");
  const [internal, setInternal] = React.useState(true);
  const [description, setDescription] = React.useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const table = type === "signal" ? "signals" : "actions";
    const user = await getCurrentUser();

    if (user) {
      await supabase.from(table).insert({
        user_id: user.id,
        state,
        internal,
        description,
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-sign-or-action-form">
      <Radio
        options={["signal", "action"]}
        name="type"
        onChange={(value) => {
          setType(value);
        }}
      />
      <Radio
        options={["red", "yellow", "green"]}
        name="state"
        addClassesOnSelected={{
          red: "input--radio-item--red",
          yellow: "input--radio-item--yellow",
          green: "input--radio-item--green",
        }}
        onChange={(value) => {
          setState(value);
        }}
      />
      <Radio
        options={["internal", "external"]}
        name="internal"
        onChange={(value) => {
          setInternal(value === "internal");
        }}
      />
      <TextArea
        name="description"
        onChange={(value) => {
          setDescription(value);
        }}
      />
      <Submit name="Submit" />
    </form>
  );
}
