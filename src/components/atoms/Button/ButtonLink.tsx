import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default function ButtonLink({
  state,
  text,
  to,
}: {
  state?: string;
  text: string;
  to: string;
}) {
  const themeClass = state ? `button--text--${state}` : "";

  return (
    <Link to={to} className={"button " + themeClass}>
      <span className="button--text">{text}</span>
    </Link>
  );
}
