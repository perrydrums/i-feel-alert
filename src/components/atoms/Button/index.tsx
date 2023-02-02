import React from "react";

import "./style.css";

export default function Button({
  state,
  text,
  pulse = false,
  small = false,
  rounded = false,
  onClick,
}: {
  state?: string;
  text: string;
  pulse?: boolean;
  small?: boolean;
  rounded?: boolean;
  onClick?: () => any;
}) {
  const themeClass = state ? `button--text--${state}` : "";
  const pulseClass = pulse ? "button--animation" : "";
  const smallClass = small ? "button--small" : "";
  const roundedClass = rounded ? "button--rounded" : "";

  return (
    <button
      className={`button ${themeClass} ${pulseClass} ${smallClass} ${roundedClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
