import React, { ReactNode } from "react";
import "./style.css";

export default function Toolbar({
  title = "",
  button = null,
}: {
  title?: string;
  button?: ReactNode;
  state?: string;
}) {
  return (
    <div className="toolbar">
      <p className="toolbar--name">{title}</p>
      <div className="toolbar--button">{button || ""}</div>
    </div>
  );
}
