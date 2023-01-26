import React from "react";
import "../TextField/style.css";

export default function Password({
  name,
  onChange,
}: {
  name: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <input
        type="password"
        name={name}
        id={name}
        placeholder={name}
        className="input--textfield"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
