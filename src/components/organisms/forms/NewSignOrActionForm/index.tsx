import React from "react";

import { getCurrentUser } from "../../../../helpers/auth";
import { supabase } from "../../../../helpers/client";
import Radio from "../../../atoms/inputs/Radio";
import Submit from "../../../atoms/inputs/Submit";
import TextArea from "../../../atoms/inputs/TextArea";
import "./style.css";

export default function NewSignOrActionForm({
  type,
  onClose,
}: {
  type: "signal" | "action";
  onClose: () => void;
}) {
  const [className, setClassName] = React.useState("new-sign-or-action-form");
  const [state, setState] = React.useState("");
  const [internal, setInternal] = React.useState(true);
  const [description, setDescription] = React.useState("");

  // Add "open" to className after .5s
  React.useEffect(() => {
    setTimeout(() => {
      setClassName("new-sign-or-action-form open");
    }, 0);
  }, []);

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

      onClose();
    }
  };

  return (
    <form onSubmit={onSubmit} className={className}>
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
      <Submit name={`Add ${type}`} />
    </form>
  );
}
