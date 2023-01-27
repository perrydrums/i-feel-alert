import React from "react";

import "./style.css";

export default function Loading({
  small = false,
  themed = false,
  text,
}: {
  small?: boolean;
  themed?: boolean;
  text?: string;
}) {
  const themeClass = themed ? "border-top-theme" : "";
  return (
    <div className={small ? "loading-small" : "loading"}>
      {text && <h1>{text}</h1>}
      <div className={`loading__spinner--1 ${themeClass}`} />
      <div className={`loading__spinner--2 ${themeClass}`} />
      <div className={`loading__spinner--3 ${themeClass}`} />
    </div>
  );
}
