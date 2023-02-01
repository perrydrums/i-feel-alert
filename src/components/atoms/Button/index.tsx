import React from "react";

import "./style.css";

export default function Button({
  state,
  text,
  pulse = false,
  small = false,
  onClick,
}: {
  state?: string;
  text: string;
  pulse?: boolean;
  small?: boolean;
  onClick?: () => any;
}) {
  const themeClass = state ? `button--text--${state}` : "";
  const pulseClass = pulse ? "button--animation" : "";
  const smallClass = small ? "button--small" : "";

  return (
    <button
      className={`button ${themeClass} ${pulseClass} ${smallClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
