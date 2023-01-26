import React, { ReactNode } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export function CircleButton({
  state = "default",
  onClick,
  size = "36px",
  children,
}: {
  state?: string;
  size?: string;
  onClick?: () => any;
  children: ReactNode;
}) {
  const themeClass = state ? `theme--dark-${state}` : "";

  return (
    <button
      className={`circle-button circle-button--icon ${themeClass}`}
      onClick={onClick}
      style={{ fontSize: size }}
    >
      {children}
    </button>
  );
}

export function LinkCircleButton({
  state = "default",
  to,
  children,
}: {
  state?: string;
  to: string;
  children: ReactNode;
}) {
  const themeClass = state ? `theme--dark-${state}` : "";

  return (
    <Link to={to}>
      <button className={`circle-button circle-button--icon ${themeClass}`}>
        {children}
      </button>
    </Link>
  );
}

export function ArrowButton({
  state,
  direction,
  hide,
  onClick,
}: {
  state?: string;
  direction: "up" | "down";
  hide: boolean;
  onClick?: () => any;
}) {
  const themeClass = state ? `theme--${state}` : "";
  const hideClass = hide ? "hide" : "";
  const arrow = direction === "up" ? "▲" : "▼";

  return (
    <button
      className={`circle-button arrow-button ${themeClass} ${hideClass}`}
      onClick={onClick}
    >
      {arrow}
    </button>
  );
}
