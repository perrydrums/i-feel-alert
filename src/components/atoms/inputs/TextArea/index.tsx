import React from "react";
import "./style.css";

export default function TextArea({
  name,
  onChange,
}: {
  name: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      name={name}
      className="input--textarea"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
