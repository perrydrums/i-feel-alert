import React from "react";
import "./style.css";

export default function Submit({ name }: { name: string }) {
  return <input type="submit" className="input--submit" value={name} />;
}
