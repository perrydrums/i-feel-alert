import React from "react";

import "./style.css";

export default function ButtonContainer({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="button-container button-container--reveal-animation"
      style={style}
    >
      {children}
    </div>
  );
}
