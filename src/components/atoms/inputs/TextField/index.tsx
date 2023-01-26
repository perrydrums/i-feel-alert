import React from "react";
import "./style.css";

export default function TextField({
  name,
  onChange,
}: {
  name: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <input
        type="text"
        name={name}
        id={name}
        placeholder={name}
        className="input--textfield"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
